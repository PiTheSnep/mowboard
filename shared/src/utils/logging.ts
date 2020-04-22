import { createLogger as winstonLogger, transports, format } from "winston";

const { combine, timestamp, colorize, splat } = format;

export const createLogger = () =>
	winstonLogger({
		transports: new transports.Console(),
		format: combine(
			timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			splat(),
			colorize({ message: false, level: true }),
			format.printf(
				(info) => `${info.timestamp} ${info.level} ${info.message}`,
			),
		),
	});
