import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ routerName: 'users', path: '/register', method: 'post', func: this.register },
			{ routerName: 'users', path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request<object, object, UserLoginDto>, res: Response, next: NextFunction) {
		console.log(req.body);
		next(new HTTPError(401, 'Ошибка авторизации', 'login'));
	}

	async register(
		{ body }: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		this.ok(res, newUser);
	}
}
