export interface Environment {
	TOKEN: string;

	DB_URI: string;
	READ_PERMISSION_LEVEL: string;
	WRITE_PERMISSION_LEVEL: string;

	BACKEND_PORT: string;
	CLIENT_ID: string;
	CLIENT_SECRET: string;
	WS_PORT: string;
	REDIRECT_URI: string;
	SCOPE: string;
}

export const EnvironmentSchema = {
	TOKEN: String,

	DB_URI: String,
	READ_PERMISSION_LEVEL: String,
	WRITE_PERMISSION_LEVEL: String,

	BACKEND_PORT: String,
	CLIENT_ID: String,
	CLIENT_SECRET: String,
	WS_PORT: String,
	REDIRECT_URI: String,
	SCOPE: String,
};
