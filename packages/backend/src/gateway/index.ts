import { IncomingMessage } from 'http';
import WebSocket from 'ws';

import { getEnv, utils } from '@mowboard/shared';

import { NyawesomeServer } from '../NyawesomeServer';
import { OutgoingSocketMessage } from './events/outgoing/types';
import { Socket, SocketEvents } from './Socket';

const env = getEnv();

interface GatewayServerConfig {
	port: number | string;
}

const DEFAULT_SERVER_CONFIG: GatewayServerConfig = {
	port: env.WS_PORT,
};

/**
 * Socket server for communicating with the bot.
 */
export class GatewayServer {
	readonly config = DEFAULT_SERVER_CONFIG;
	readonly logger = utils.createLogger();

	wss?: WebSocket.Server;
	connections: Map<string, Socket> = new Map();
	botSocket?: Socket;

	constructor(
		readonly global: NyawesomeServer,
		config: Partial<GatewayServerConfig> = DEFAULT_SERVER_CONFIG,
	) {
		this.config = { ...DEFAULT_SERVER_CONFIG, ...config };
	}

	start() {
		this.wss = new WebSocket.Server({ port: Number(this.config.port) })
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
	handleConnection(ws: WebSocket, incomingMessage: IncomingMessage) {
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
	sendBotEvent(ev: OutgoingSocketMessage<any>): this {
		if (!this.botSocket) {
			return this;
		}

		this.botSocket.send(ev);

		return this;
	}
}
