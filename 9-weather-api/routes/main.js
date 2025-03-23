import { Router } from 'express';
import createHttpError from 'http-errors';
import { api } from '../services/services.js';
import { token, city } from '../parameters/parameters.js';

const mainRouter = new Router();

mainRouter.get('/', async (req, res) => {
	try {
		const cityName = await city.read();
		res.render('main', { cityName });
	} catch(err) {
		res.status(err.status).render(`errors/error`, { err });
	}
});

mainRouter.post('/', async (req, res) => {
	try {
		const tokenName = await token.read();
		const isTokenValid = await api.validateToken(tokenName);
		if (!isTokenValid) {
			throw createHttpError(400, 'Токен не является валидным, перейдите в настройки');
		}
		const { cityName } = req.body;
		const isCityValid = await api.validateCity(tokenName, cityName);
		if (!isCityValid) {
			throw createHttpError(400, `Название города '${cityName}' не является валидным`);
		}
		const forcast = await api.getForcast(tokenName, cityName);
		await city.save(cityName);
		res.render('weather', { forcast, cityName });
	} catch(err) {
		res.status(err.status).render(`errors/error`, { err });
	}
});

export { mainRouter };
