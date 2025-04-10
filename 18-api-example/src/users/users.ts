import express, { Router } from 'express';

const userRouter = Router();

userRouter.post('/login', (req, res) => {
	res.send('login');
});

userRouter.post('/register', (req, res) => {
	res.send('register');
});

export { userRouter };
