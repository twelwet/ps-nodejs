import { Router } from 'express';
import { token, city } from '../parameters/parameters.js';

const settingsRouter = new Router();

settingsRouter.get('/', async (req, res) => {
	try {
		const cityName = await city.read();
		const tokenName = await token.read();
		res.render('settings', { tokenName, cityName });
	} catch(err) {
		res.status(err.status).render(`errors/error`, { err });
	}
});

settingsRouter.post('/', async (req, res) => {
	try {
		const { cityName, tokenName } = req.body;
		console.log('hello from here!');
		await token.save(tokenName);
		await city.save(cityName);
		res.redirect('/');
	} catch(err) {
		res.status(err.status).render(`errors/error`, { err });
	}
});

export { settingsRouter };
