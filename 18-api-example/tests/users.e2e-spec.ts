import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;
let jwt: string;

beforeAll(async () => {
	const { app, appContainer } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'a@a.com', password: 'qwerty' });

		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'a@a.com', password: 'qwerty' });

		expect(res.body.jwt).not.toBeUndefined();
		expect(res.statusCode).toBe(200);
	});

	it('Login - error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'a@a.com', password: 'wrong_password' });

		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'a@a.com', password: 'qwerty' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.body.email).toBe('a@a.com');
	});

	it('Info - error', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer 123`);

		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
