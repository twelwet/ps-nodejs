import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ConfigService implements IConfigService {
	private configResult: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
		} else {
			this.logger.log('[ConfigService] Конфигурация .env загружена');
			this.configResult = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.configResult[key];
	}
}
