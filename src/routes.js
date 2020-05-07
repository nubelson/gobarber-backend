import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Definir o uso do authMiddleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
