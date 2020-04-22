import { IncomingMessage } from "http";
import WebSocket from "ws";

import { env, utils } from "@mowboard/shared/src";

import { NyawesomeServer } from "../NyawesomeServer";
import { OutgoingSocketMessage } from "./events/outgoing/types";
import { Socket, SocketEvents } from "./Socket";

interface NyawesomeGatewayServerConfig {
	port: number;
}

const DEFAULT_SERVER_CONFIG: NyawesomeGatewayServerConfig = {
	port: env.WS_PORT,
};

/**
 * Socket server for communicating with the bot.
 */
export class NyawesomeGatewayServer {
	readonly config = DEFAULT_SERVER_CONFIG;
	readonly logger = utils.createLogger();
	wss?: WebSocket.Server;

	public connections: Map<string, Socket> = new Map();
	public botSocket?: Socket;

	constructor(
		readonly global: NyawesomeServer,
		config: Partial<NyawesomeGatewayServerConfig> = DEFAULT_SERVER_CONFIG,
	) {
		this.config = { ...DEFAULT_SERVER_CONFIG, ...config };
	}

	public start() {
		this.wss = new WebSocket.Server({ port: this.config.port })
			.on("listening", () => {
				this.logger.info("WSS listening on port %d.", this.config.port);
			})
			.on("connection", (ws, con) => this.handleConnection(ws, con))
			.on("error", (err) => this.logger.error(err));
	}

	/**
	 * Handle a new socket connection.
	 * @param ws
	 * @param con
	 */
	public handleConnection(ws: WebSocket, incomingMessage: IncomingMessage) {
		const socket = new Socket(this, ws, incomingMessage);
		this.connections.set(socket.addr, socket);

		// Forget connection on close.
		socket.on(SocketEvents.Close, () =>
			this.connections.delete(socket.addr),
		);
	}

	/**
	 * Send an event to nyawesome.
	 */
	public sendBotEvent(ev: OutgoingSocketMessage<any>): this {
		if (!this.botSocket) {
			return this;
		}

		this.botSocket.send(ev);

		return this;
	}
}
