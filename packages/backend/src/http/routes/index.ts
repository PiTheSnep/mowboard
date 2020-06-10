import { RequestHandler } from "express";

import { NyawesomeHttpServer } from "../";
import { guilds } from "./guilds";
import { oauth2 } from "./oauth2";
import { users } from "./users";

export interface Route {
	path: string;
	method: "get" | "post" | "use";
	handler: (server: NyawesomeHttpServer) => RequestHandler;
}

export const routes: Route[] = [oauth2, users, guilds];
