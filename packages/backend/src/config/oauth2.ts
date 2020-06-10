import { Schema } from "@mowboard/shared";

interface OAuth2Config {
	client_id: string;
	client_secret: string;
	redirect_uri: string;
	scope: string;
}

export const OAuth2ConfigSchema: Schema<OAuth2Config> = {
	client_id: String,
	client_secret: String,
	redirect_uri: String,
	scope: String,
};

export const OAuth2Config: OAuth2Config = {
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	redirect_uri: process.env.REDIRECT_URI,
	scope: process.env.SCOPE,
};
