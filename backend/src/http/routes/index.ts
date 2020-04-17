import { RequestHandler } from "express";

import { KittyServer } from "../";
import { guilds } from "./guilds";
import { oauth2 } from "./oauth2";
import { users } from "./users";

export interface Route {
	path: string;
	method: "get" | "post" | "use";
	handler: (server: KittyServer) => RequestHandler;
}

export const routes: Route[] = [oauth2, users, guilds];
