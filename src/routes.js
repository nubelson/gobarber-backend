import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Definir o uso do authMiddleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ ok: true });
});

export default routes;
