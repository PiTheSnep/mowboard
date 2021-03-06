import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Server } from "http";
import morgan from "morgan";

import { getEnv } from "@mowboard/shared";

import { NyawesomeServer } from "../NyawesomeServer";
import { createLogger } from "../utils/logging";
import * as errors from "./errors";
import { routes } from "./routes";

const env = getEnv();

interface HttpServerConfig {
	port: string | number;
}

const DEFAULT_SERVER_CONFIG: HttpServerConfig = {
	port: env.BACKEND_PORT,
};

/**
 * Basic wrapper around an express server.
 */
export class HttpServer {
	public readonly logger = createLogger("api");
	public readonly config: HttpServerConfig = DEFAULT_SERVER_CONFIG;

	public readonly express: express.Application = express();
	public readonly http: Server = new Server(this.express);

	constructor(
		readonly global: NyawesomeServer,
		config: Partial<HttpServerConfig> = DEFAULT_SERVER_CONFIG,
	) {
		this.config = { ...DEFAULT_SERVER_CONFIG, ...config };

		// Middleware
		this.express
			.use(cors())
			.use(bodyParser.json())
			.use(
				morgan("dev", {
					stream: { write: (msg) => this.logger.debug(msg) },
				}),
			);

		// HTTP event handlers
		this.http
			.on("error", (err) => this.logger.error(err))
			.on("close", () => this.logger.warn("HTTP server closed."))
			.on("listening", () =>
				this.logger.info(
					"HTTP server listening on %d.",
					this.config.port,
				),
			);

		this.registerRoutes();
	}

	/**
	 * Register server routes.
	 */
	registerRoutes() {
		routes.forEach((route) => {
			this.logger.debug(
				"Register route:",
				route.method.toUpperCase(),
				route.path,
			);
			this.express[route.method](route.path, route.handler(this));
		});

		this.express
			.all("/", (req, res) =>
				res.json({
					v: require("../../package.json").version,
					uptime: Math.floor(process.uptime()),
				}),
			)
			.use((req, res) => errors.NotFound(res));
	}

	start() {
		this.http.listen(this.config.port);
	}
}
