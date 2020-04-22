import { env } from "@mowboard/shared";
import { ObjectFromSchema } from "@mowboard/shared/dist/utils/";

export const OAuth2ConfigSchema = {
	client_id: String,
	client_secret: String,
	redirect_uri: String,
	scope: String,
};

export const OAuth2Config: ObjectFromSchema<typeof OAuth2ConfigSchema> = {
	client_id: env.CLIENT_ID,
	client_secret: env.CLIENT_SECRET,
	redirect_uri: env.REDIRECT_URI,
	scope: env.SCOPE,
};
