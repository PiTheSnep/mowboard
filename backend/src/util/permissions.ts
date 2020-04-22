import { env } from "@mowboard/shared/src";

import { Guild, GuildModel } from "../models/Guild";
import { fetchGuildMemberRoles } from "./discord";

export const getGuildsWithPermission = async (userID: string) => {
	await GuildModel.find({});
};

export const extractUserPermission = (config: Guild) => {};

export const hasRequiredPermission = () => {};

/**
 * Gets whether a user has write permission for the guild.
 */
export const hasGuildWritePermission = async (
	guildID: string,
	userID: string,
) => {
	const config = await GuildModel.findById(guildID);
	if (!config) {
		return false;
	}

	if (
		config.permissions &&
		config.permissions.users &&
		config.permissions.users[userID] &&
		config.permissions.users[userID] >= Number(env.WRITE_PERMISSION_LEVEL)
	) {
		return true;
	}

	const roles = await fetchGuildMemberRoles(guildID, userID);
	for (const role in roles) {
		if (
			config.permissions &&
			config.permissions.roles &&
			config.permissions.roles[role] >= Number(env.WRITE_PERMISSION_LEVEL)
		) {
			return true;
		}
	}

	return false;
};

/**
 * Gets whether a user has write permission for the guild.
 */
export const hasGuildReadPermission = async (
	guildID: string,
	userID: string,
) => {
	const config = await GuildModel.findById(guildID);
	if (!config) {
		return false;
	}

	if (
		config.permissions &&
		config.permissions.users &&
		config.permissions.users[userID] &&
		config.permissions.users[userID] >= Number(env.READ_PERMISSION_LEVEL)
	) {
		return true;
	}

	const roles = await fetchGuildMemberRoles(guildID, userID);
	for (const role in roles) {
		if (
			config.permissions &&
			config.permissions.roles &&
			config.permissions.roles[role] >= Number(env.READ_PERMISSION_LEVEL)
		) {
			return true;
		}
	}

	return false;
};

export const getAccessType = async (
	guildID: string,
	userID: string,
): Promise<"read" | "write" | null> => {
	const config = await GuildModel.findById(guildID);

	return null;
};
