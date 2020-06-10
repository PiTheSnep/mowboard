import { getEnv } from "@mowboard/shared";

import { ErrorCodes } from "../";
import { IncomingEvents, IncomingSocketHandler } from "./types";

const env = getEnv();

interface IdentifyEvent {
	token: string;
}

/**
 * Handle authorization requests.
 */
export const IDENTIFY: IncomingSocketHandler<IdentifyEvent> = {
	op: IncomingEvents.IDENTIFY,
	handler: (socket, ev) => {
		if (!ev.token) {
			return socket.close(ErrorCodes.UNKNOWN_OPCODE);
		}

		if (ev.token === env.TOKEN) {
			return socket.authorize(true);
		}

		return socket.close(ErrorCodes.AUTHORIZATION_FAILED);
	},
	validationSchema: {
		token: String,
	},
};
