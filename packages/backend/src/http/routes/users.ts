import { Router } from 'express';

import { ClientUserModel, UserModel } from '../../models';
import { removeFields } from '../../utils/mongo';
import { ServersideError } from '../errors';
import { fetchToken, requireAuthentication } from '../utils/auth';
import { Route } from './';

export const users: Route = {
	method: "use",
	path: "/users",
	handler: () =>
		Router().get("/@me", requireAuthentication, async (req, res) => {
			const token = fetchToken(req);
			if (!token) {
				return ServersideError(res);
			}

			const clientUser = await ClientUserModel.findOne({ token });

			if (!clientUser) {
				return ServersideError(res);
			}

			const user = await UserModel.findById(clientUser._id);

			if (!user) {
				return ServersideError(res);
			}

			return res.json(removeFields(user));
		}),
};
