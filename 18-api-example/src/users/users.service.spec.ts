import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRerository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types';
import { UserService } from './users.service';
import { UserModel } from '@prisma/client';
import { User } from './user.entity';
import 'reflect-metadata';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRerository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRerository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.IUserService).to(UserService);
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRerository>(TYPES.IUsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.IConfigService);
	usersRepository = container.get<IUsersRerository>(TYPES.IUsersRepository);
	userService = container.get<IUserService>(TYPES.IUserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		usersRepository.create = jest.fn().mockImplementationOnce((user: User): UserModel => {
			return {
				email: user.email,
				name: user.name,
				password: user.password,
				id: 123456,
			};
		});

		createdUser = await userService.createUser({
			email: 'b@b.com',
			name: 'Boris',
			password: '123',
		});

		expect(createdUser?.id).toEqual(123456);
		expect(createdUser?.password).not.toEqual('123');
	});

	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const isUserValid = await userService.validateUser({
			email: 'b@b.com',
			password: '123',
		});

		expect(isUserValid).toBeTruthy();
	});

	it('validateUser - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const isUserValid = await userService.validateUser({
			email: 'b@b.com',
			password: 'incorrect_password',
		});

		expect(isUserValid).toBeFalsy();
	});

	it('validateUser - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);

		const isUserValid = await userService.validateUser({
			email: 'some_user@b.com',
			password: 'some_password',
		});

		expect(isUserValid).toBeFalsy();
	});
});
