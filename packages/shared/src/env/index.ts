import { config } from "dotenv";

import { validateObject } from "../validation";
import { recursiveSearch } from "./fs";
import {
    Environment, EnvironmentSchema, FrontendEnvironment, FrontendEnvironmentSchema
} from "./types";
import { include } from "./utils";

/**
 * Actually fetch the environment config.
 */
const _getEnv = () => {
	// Register .env
	if (process.env.NODE_ENV != "production") {
		const res = config({ path: recursiveSearch(".env") });
		if (res.error) {
			console.error(res.error);
		}
	}

	return include(
		process.env,
		...(Object.keys(
			EnvironmentSchema,
		) as (keyof typeof EnvironmentSchema)[]),
	) as Environment;
};

/**
 * Fetch the environment config.
 */
export const getEnv = () => {
	const env = _getEnv();

	// Validate environment.
	const validation = validateObject(EnvironmentSchema, env);
	if (!validation.valid) {
		throw "Environment is invalid.";
	}

	return env;
};

/**
 * Fetch the environment config without sensitive variables.
 */
export const getFrontendSafeEnv = () => {
	const env = _getEnv();

	const frontendEnv = include(
		env,
		...(Object.keys(
			FrontendEnvironmentSchema,
		) as (keyof typeof EnvironmentSchema)[]),
	);

	const validation = validateObject(FrontendEnvironmentSchema, frontendEnv);
	if (!validation.valid) {
		throw "Environment is not valid.";
	}

	return frontendEnv;
};
