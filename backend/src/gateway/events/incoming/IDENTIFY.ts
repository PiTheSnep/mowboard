import { getEnv } from "@mowboard/shared";
import { ObjectFromSchema } from "@mowboard/shared/dist/utils";
import { ErrorCodes } from "../";
import { IncomingEvents, IncomingSocketHandler } from "./types";

const env = getEnv();

const IdentifyEventSchema = {
	token: String,
};

/**
 * Handle authorization requests.
 */
export const IDENTIFY: IncomingSocketHandler<ObjectFromSchema<
	typeof IdentifyEventSchema
>> = {
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
	validationSchema: IdentifyEventSchema,
};
