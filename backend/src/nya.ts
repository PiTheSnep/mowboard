import { execSync } from "child_process";
import colors from "colors/safe";

import { KeppCon } from "./KeppCon";
import { KittyServer } from "./KittyServer";
import { SnepServer } from "./SnepServer";
import { createLogger } from "./util/logging";

/**
 * Get the current commit hash.
 */
const getHash = (slice = 7) => execSync("git rev-parse HEAD").slice(0, slice);

/**
 * Wrapper class for the HTTP and WS servers.
 */
export class NyAPI {
	public logger = createLogger("global");

	public http: KittyServer;
	public ws: SnepServer;
	public db: KeppCon;

	constructor() {
		console.log(`\n${colors.rainbow("nyapi")} (sha:${getHash()})`);
		console.log(
			`Package version: v${
				require("../package.json").version
			}, NODE_ENV=${process.env.NODE_ENV || "development"}\n`,
		);

		this.http = new KittyServer(this);
		this.ws = new SnepServer(this);
		this.db = new KeppCon(this);

		this.http.start();
		this.db.init();
	}
}
