import { isUndefined } from "util";

/**
 * Fetch the constructor of a type.
 */
type Constructor<T> = T extends string
	? StringConstructor
	: T extends number
	? NumberConstructor
	: T extends boolean
	? BooleanConstructor
	: T extends unknown[]
	? ArrayConstructor
	: (...args: unknown[]) => T;

type Schema<T extends object> = {
	[K in keyof T]: Constructor<T[K]>;
};

interface SchemaValidation<T> {
	missingEntries: (keyof T)[];
	invalidTypes: (keyof T)[];
	valid: boolean;
}

/**
 * Check that the provided object values matches the given schema.
 * @param schema
 * @param obj
 */
export const validateObject = <T extends { [x: string]: unknown }>(
	schema: Schema<T>,
	obj: object,
): SchemaValidation<T> => {
	const validation: SchemaValidation<T> = {
		missingEntries: [],
		invalidTypes: [],
		valid: true,
	};

	Object.entries(schema).forEach((entry) => {
		if (isUndefined(obj[entry[0]])) {
			validation.missingEntries.push(entry[0]);
		} else if (typeof obj[entry[0]] !== typeof entry[1]()) {
			validation.invalidTypes.push(entry[0]);
		}
	});

	validation.valid =
		validation.missingEntries.length === 0 &&
		validation.invalidTypes.length === 0;

	return validation;
};

/**
 * Unwrap the validation result and return the object if it was valid.
 * @param schema
 * @param obj
 */
export const validateOrUndefined = <T extends object>(
	schema: Schema<T>,
	obj: object,
): T | void => {
	const res = validateObject(schema, obj);
	if (res.valid) {
		return obj as T;
	}
	return;
};
