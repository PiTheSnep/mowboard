import { existsSync } from "fs";
import { resolve } from "path";

/**
 * Recursively search for a file by looking up the directory tree.
 * @param name
 * @param basePath The path to start the search from. Defaults to `process.cwd()`.
 */
export const recursiveSearch = (name: string, basePath = process.cwd()) => {
	const path = resolve(basePath, name);
	if (existsSync(path)) {
		return path;
	}

	if (basePath === "/") {
		throw "File not found - root directory reached.";
	}

	return recursiveSearch(name, resolve(basePath, "../"));
};
