import { utils } from "@mowboard/shared";

import { Database } from "./Database";
import { GatewayServer } from "./gateway";
import { HttpServer } from "./http";
import { createLogger } from "./utils/logging";

/**
 * Wrapper class for the HTTP and WS servers.
 */
export class NyawesomeServer {
	public logger = createLogger("global");

	public http: HttpServer;
	public ws: GatewayServer;
	public db: Database;

	constructor() {
		this.http = new HttpServer(this);
		this.ws = new GatewayServer(this);

		this.db = new Database();
	}

	public async start() {
		await this.db.init();
		this.http.start();
		this.ws.start();
	}
}
