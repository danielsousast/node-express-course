import {Router} from 'express';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import checkCredentials from './middlewares/checkCredentials';
import RecoveryController from './controllers/RecoveryController';

const routes = new Router();

routes.post('/users', UserController.store)
routes.get('/users', checkCredentials,UserController.index)
routes.put('/users', checkCredentials,UserController.update)
routes.delete('/users', checkCredentials,UserController.delete)

routes.post('/auth', AuthController.store);

routes.post('/recovery', RecoveryController.store);
routes.put('/recovery', RecoveryController.update);


export default routes;