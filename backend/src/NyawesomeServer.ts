import colors from "colors/safe";

import { getHash } from "@mowboard/shared/src/utils";

import { DatabaseUtil } from "./DatabaseUtil";
import { NyawesomeHttpServer } from "./http";
import { NyawesomeGatewayServer } from "./gateway";
import { createLogger } from "./util/logging";

/**
 * Wrapper class for the HTTP and WS servers.
 */
export class NyawesomeServer {
	public logger = createLogger("global");

	public http: NyawesomeHttpServer;
	public ws: NyawesomeGatewayServer;
	public db: DatabaseUtil;

	constructor() {
		console.log(`\n${colors.rainbow("nyapi")} (sha:${getHash()})`);
		console.log(
			`Package version: v${
				require("../package.json").version
			}, NODE_ENV=${process.env.NODE_ENV || "development"}\n`,
		);

		this.http = new NyawesomeHttpServer(this);
		this.ws = new NyawesomeGatewayServer(this);

		this.db = new DatabaseUtil();
	}

	public async start() {
		await this.db.init();
		this.http.start();
		this.ws.start();
	}
}
