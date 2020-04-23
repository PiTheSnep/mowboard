import { config } from "dotenv";
import { resolve } from "path";

import { validateObject, ValidationError } from "../utils";
import {
	Environment,
	EnvironmentSchema,
	FrontendEnvironmentSchema,
	FrontendEnvironment,
} from "./types";
import { include, omit } from "./utils";

// Register .env
if (process.env.NODE_ENV != "production") {
	config({ path: resolve(__dirname, "../../../.env") });
}

const env: Environment = include(
	process.env,
	...(Object.keys(EnvironmentSchema) as (keyof typeof EnvironmentSchema)[]),
) as Environment;

/**
 * Fetch the environment config.
 */
export const getEnv = () => {
	// Validate environment.
	const validation = validateObject(EnvironmentSchema, env);
	if (!validation.valid) {
		throw new ValidationError(validation);
	}

	return env;
};

/**
 * Fetch the environment config without sensitive variables.
 */
export const getFrontendSafeEnv = () => {
	const frontendEnv = include(
		env,
		...(Object.keys(
			FrontendEnvironmentSchema,
		) as (keyof typeof EnvironmentSchema)[]),
	) as FrontendEnvironment;

	const validation = validateObject(FrontendEnvironmentSchema, frontendEnv);
	if (!validation.valid) {
		throw new ValidationError(validation);
	}

	return frontendEnv;
};
