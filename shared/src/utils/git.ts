import { execSync } from "child_process";

/**
 * Get the current commit hash.
 */
export const getHash = (slice = 7) =>
	execSync("git rev-parse HEAD").slice(0, slice);
