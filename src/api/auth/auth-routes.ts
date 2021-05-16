import * as Hapi from '@hapi/hapi';
import AuthController from './auth-controller';
import IRoute from '../../helper/route';
import validate from './auth-validate';
import { AuthService } from './auth-service';
import { Auth } from './auth.entity';
import { getManager } from 'typeorm';

export default class AuthRoutes implements IRoute {
    public async register(server: Hapi.Server): Promise<any> {
        return new Promise<void>(async (resolve) => {
            console.log('Started - auth routes');
            let authRepo = getManager().getRepository(Auth);
            let authService = new AuthService(authRepo);
            const controller = new AuthController(authService);

            server.route([
                {
                    method: 'POST',
                    path: '/api/auth/register',
                    options: {
                        handler: controller.register,
                        validate: validate.register,
                        description: 'Method to Register User.',
                        auth: false,
                    },
                },
                {
                    method: 'POST',
                    path: '/api/auth/login',
                    options: {
                        handler: controller.login,
                        validate: validate.login,
                        description: 'Method to Login User.',
                        auth: false,
                    },
                },
                
            ]);
            console.log('Completed - auth routes');
            resolve();
        });
    }
}