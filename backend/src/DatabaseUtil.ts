import _ from "lodash";
import mongoose from "mongoose";

import { utils, env } from "@mowboard/shared";

import { Guild, GuildModel } from "./models/Guild";

enum ConnectionStatus {
	Disconnected = 0,
	Connecting,
	Connected,
	Reconnecting,
}

interface DatabaseConfig {
	dbUri: string;
	connectionOptions: mongoose.ConnectionOptions;
}

const DEFAULT_DATABASE_CONFIG: DatabaseConfig = {
	dbUri: env.DB_URI,
	connectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	},
};

/**
 * MongoDB wrapper.
 */
export class DatabaseUtil {
	public readonly logger = utils.createLogger();
	public readonly config = DEFAULT_DATABASE_CONFIG;
	public connectionStatus = ConnectionStatus.Disconnected;

	public cache: Map<string, Guild> = new Map();

	constructor(config: Partial<DatabaseConfig> = DEFAULT_DATABASE_CONFIG) {
		this.config = { ...DEFAULT_DATABASE_CONFIG, ...config };
	}
	/**
	 * Fetches a guild from the database.
	 * @param id
	 */
	async fetchGuild(id: string): Promise<Guild | null> {
		const cachedGuild = this._getCachedGuild(id);
		if (this._getCachedGuild(id)) {
			return cachedGuild;
		}

		const guild = await GuildModel.findById(id);
		if (!guild) {
			return null;
		}

		this._cacheGuild(guild);
		return guild;
	}

	/**
	 * Check whether a guild exists in the database.
	 */
	async guildExists(id: string): Promise<boolean> {
		if (this._getCachedGuild(id)) {
			return true;
		}
		return (await this.fetchGuild(id)) ? true : false;
	}

	/**
	 * Check if multiple guilds exist in the database.
	 * @param ids
	 */
	async guildExistsMany(ids: string[]): Promise<string[]> {
		const guilds: string[] = [];
		const guildsNeedFetching: string[] = [];

		// Sort out cached guilds from ID array.
		for (const id of ids) {
			let cachedGuild = this._getCachedGuild(id);
			if (cachedGuild) {
				guilds.push(cachedGuild.id);
				continue;
			}
			guildsNeedFetching.push(id);
		}

		// Fetch the missing guilds from the database.
		const fetchedGuilds = await GuildModel.find({
			_id: { $in: guildsNeedFetching },
		});

		// Concat fetched guilds with cached guild ids, cache fetched guilds.
		return guilds.concat(
			fetchedGuilds.map((v) => {
				this._cacheGuild(v);
				return v.id;
			}),
		);
	}

	/**
	 * Of the IDs in the array, return an array of IDs that do not exist in the database.
	 */
	async guildExistsManyDiff(ids: string[]): Promise<string[]> {
		return _.difference(ids, await this.guildExistsMany(ids));
	}

	/**
	 * Initialize the DB wrapper.
	 */
	async init() {
		await this._tryConnection();
	}

	/**
	 * Cache a guild in local memory.
	 * @param guild
	 */
	private _cacheGuild(guild: Guild) {
		this.logger.debug(`[cache] added '${guild.id}' to cache.`);
		this.cache.set(guild.id, guild);
	}

	private _getCachedGuild(id: string) {
		return this.cache.get(id) || null;
	}

	/**
	 * Try to connect to the database.
	 * @param attemptsRemaining
	 */
	private async _tryConnection(attemptsRemaining = 5): Promise<true> {
		this.logger.debug(
			`Making connection attempt - ${attemptsRemaining} remaining...`,
		);

		try {
			await mongoose.connect(env.DB_URI, this.config.connectionOptions);
			this.connectionStatus = ConnectionStatus.Connected;

			this.logger.info("Connected to MongoDB.");

			return true;
		} catch (err) {
			this.logger.warn(
				"Could not connect to MongoDB: (full stack below)",
				err,
			);
			attemptsRemaining--;
			console.error(err);
		}

		if (attemptsRemaining == 0) {
			throw Error("Could not connect to MongoDB.");
		}

		return this._tryConnection(attemptsRemaining);
	}
}
