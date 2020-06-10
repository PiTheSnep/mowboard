import { Schema } from "@mowboard/shared/dist/utils";

import { Socket } from "../../Socket";
import { DispatchEvents } from "../dispatch";

export enum IncomingEvents {
	IDENTIFY = 2,
	HEARTBEAT = 1,
}

/**
 * An incoming socket message.
 */
export interface IncomingSocketMessage<D> {
	op: IncomingEvents;
	d: D;
	t?: DispatchEvents;
}

/**
 * Represents a handler for an incoming socket message.
 */
export interface IncomingSocketHandler<D extends object> {
	op: IncomingEvents;
	handler: (socket: Socket, ev: D) => void;
	requireAuth?: boolean;
	validationSchema?: Schema<D>;
}
