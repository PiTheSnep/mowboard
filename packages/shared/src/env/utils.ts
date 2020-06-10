interface Omit {
	<T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
		[K2 in Exclude<keyof T, K[number]>]: T[K2];
	};
}

interface Include {
	<T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
		[K2 in Extract<keyof T, K[number]>]: T[K2];
	};
}

/**
 * Omit keys from an object.
 * @param obj
 * @param keys
 */
export const omit: Omit = (obj, ...keys) => {
	let ret = {} as {
		[K in keyof typeof obj]: typeof obj[K];
	};
	let key: keyof typeof obj;
	for (key in obj) {
		if (!keys.includes(key)) {
			ret[key] = obj[key];
		}
	}
	return ret;
};

/**
 * Extract the specified keys from an object.
 * @param obj
 * @param keys
 */
export const include: Include = (obj, ...keys) => {
	let ret = {} as {
		[K in keyof typeof obj]: typeof obj[K];
	};

	let key: keyof typeof obj;
	for (key in obj) {
		if (keys.includes(key)) {
			ret[key] = obj[key];
		}
	}
	return ret;
};
