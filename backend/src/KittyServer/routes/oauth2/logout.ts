import * as express from "express";

import { KittyServer } from "../..";
import { ClientUserModel } from "../../../KeppCon/models/ClientUser";
import { ServersideError } from "../../errors";
import { fetchToken } from "../../util/auth";

export const logoutHandler = (server: KittyServer) => async (
	req: express.Request,
	res: express.Response,
) => {
	const token = fetchToken(req);
	if (!token) {
		return ServersideError(res);
	}

	const user = await ClientUserModel.findOne({ token });

	if (!user) {
		return ServersideError(res);
	}

	server.logger.debug(
		`[oauth2] User ID "${user._id}" requesting logout - removing client user from database...`,
	);

	await ClientUserModel.deleteOne({ _id: user._id });
	res.json(true);

	return server.logger.debug(`Done.`);
};
