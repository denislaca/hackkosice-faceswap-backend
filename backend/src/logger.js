import winston from "winston";
import * as packageJson from "../package.json";


const logLevel = process.env.LOG_LEVEL || "debug";

/* Match GKE levels */
const levels = {
	debug: 5,
	info: 4,
	warning: 3,
	error: 2,
	critical: 1
};

/* Logger creating function */
export default {
	create: (loggerName) => {
		return new(winston.Logger)({
			transports: [
				new(winston.transports.Console)({
					formatter: (options) => {
						let logObject = {
							time: new Date().toISOString(),                            
							severity: options.level.toUpperCase(),
							message: `[${ loggerName }] ${options.level.toUpperCase()}: ${options.message}`,
							meta: {
							}
						};
						if (options.meta && Object.keys(options.meta).length) {
							logObject.meta = Object.assign(logObject.meta, options.meta);
						}
						return JSON.stringify(logObject).trim();
					}
				})
			],
			levels: levels,
			level: logLevel
		});
	}
};

