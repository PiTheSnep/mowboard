import { config } from "dotenv";
import { resolve } from "path";

import { validateObject, ValidationError } from "../utils";
import { Environment, EnvironmentSchema } from "./types";
import { include, omit } from "./utils";

// Register .env
if (process.env.NODE_ENV != "production") {
	process.env.NODE_ENV = "development";
	config({ path: resolve(__dirname, "../../../.env") });
}

const env: Environment = include(
	process.env,
	...(Object.keys(EnvironmentSchema) as (keyof typeof EnvironmentSchema)[]),
) as Environment;

// Validate environment.
const validation = validateObject(EnvironmentSchema, env);
if (!validation.valid) {
	throw new ValidationError(validation);
}

export { env };

export const frontendSafeEnv = omit(
	env,
	"BACKEND_PORT",
	"CLIENT_ID",
	"CLIENT_SECRET",
	"DB_URI",
	"READ_PERMISSION_LEVEL",
	"REDIRECT_URI",
	"SCOPE",
	"TOKEN",
	"WRITE_PERMISSION_LEVEL",
	"WS_PORT",
);
