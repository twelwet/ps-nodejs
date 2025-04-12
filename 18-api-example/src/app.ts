import { Server } from 'node:http';
import express, { Express } from 'express';
import { json } from 'body-parser';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/user.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { TYPES } from './types';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: UserController,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddlewares() {
		this.app.use(json());
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init() {
		this.useMiddlewares();
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на localhost:${this.port}`);
	}
}
