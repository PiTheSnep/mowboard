import * as express from "express";

import { validateObject } from "@mowboard/shared/";

import { Route } from "../";
import { HttpServer } from "../..";
import { DispatchEvents } from "../../../gateway/events/dispatch";
import { OutgoingEvents } from "../../../gateway/events/outgoing/types";
import { BadRequest } from "../../errors";
import { requireAuthentication } from "../../utils/auth";

const PermissionUpdateSchema = {
	level: Number,
	member: String,
};

export const permissionsHandler: Route = {
	method: "use",
	path: "/:id/permissions",
	handler: (server: HttpServer) =>
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
