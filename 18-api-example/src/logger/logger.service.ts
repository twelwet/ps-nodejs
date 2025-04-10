import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.interface';

export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({
			type: 'pretty',
			prettyLogTimeZone: 'local',
			prettyLogTemplate: '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t',
			prettyLogStyles: {
				logLevelName: {
					INFO: ['bold', 'blue'],
					ERROR: ['bold', 'red'],
					WARN: ['bold', 'yellow'],
				},
				dateIsoStr: ['white', 'dim'],
			},
		});
	}

	log(...args: unknown[]) {
		this.logger.info(...args);
	}

	error(...args: unknown[]) {
		this.logger.error(...args);
	}

	warn(...args: unknown[]) {
		this.logger.warn(...args);
	}
}
