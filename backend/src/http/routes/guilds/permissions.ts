import * as express from "express";

import { validateObject } from "@mowboard/shared/src/utils";

import { Route } from "../";
import { NyawesomeHttpServer } from "../..";
import { DispatchEvents } from "../../../gateway/events/dispatch";
import { OutgoingEvents } from "../../../gateway/events/outgoing/types";
import { BadRequest } from "../../errors";
import { requireAuthentication } from "../../util/auth";

const PermissionUpdateSchema = {
	level: Number,
	member: String,
};

export const permissionsHandler: Route = {
	method: "use",
	path: "/:id/permissions",
	handler: (server: NyawesomeHttpServer) =>
		express
			.Router()
			.get("/", requireAuthentication, (req, res) => {
				res.json({});
			})
			.put("/", (req, res) => {
				if (validateObject(PermissionUpdateSchema, req.body)) {
					return BadRequest(res);
				}

				const d = {
					member: req.body.member,
					guild: req.params.id,
					level: req.body.level,
				};

				server.global.ws.sendBotEvent({
					op: OutgoingEvents.DISPATCH,
					t: DispatchEvents.UpdatePermission,
					d,
				});

				return res.json(d);
			}),
};
