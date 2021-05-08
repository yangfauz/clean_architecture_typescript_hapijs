import * as Hapi from '@hapi/hapi';
import UserController from './user-controller';
import IRoute from '../../helper/route';
import validate from './user-validate';
import { UserService } from './user-service';
import { User } from './user.entity';
import { getManager } from 'typeorm';

export default class UserRoutes implements IRoute {
    public async register(server: Hapi.Server): Promise<any> {
        return new Promise<void>(async (resolve) => {
            console.log('Started - user routes');
            let userRepo = getManager().getRepository(User);
            let userService = new UserService(userRepo);
            const controller = new UserController(userService);

            server.route([
                {
                    method: 'GET',
                    path: '/api/users',
                    options: {
                        handler: controller.getAll,
                        description: 'Method that gets all users.',
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: '/api/users/{id}',
                    options: {
                        handler: controller.getById,
                        validate: validate.getById,
                        description: 'Method to get a user by its id.',
                        auth: false,
                    },
                },
                {
                    method: 'POST',
                    path: '/api/users/create',
                    options: {
                        handler: controller.create,
                        validate: validate.create,
                        description: 'Method to create a new user.',
                        auth: false,
                    },
                },
                {
                    method: 'PUT',
                    path: '/api/users/update/{id}',
                    options: {
                        handler: controller.update,
                        validate: validate.updateById,
                        description: 'Method to update a user by its id.',
                        auth: false,
                    },
                },
                {
                    method: 'DELETE',
                    path: '/api/users/delete/{id}',
                    options: {
                        handler: controller.delete,
                        validate: validate.deleteById,
                        description: 'Method that deletes a user by its id.',
                        auth: false,
                    },
                },
                // {
                //     method: 'GET',
                //     path: '/api/users/field/{text}',
                //     options: {
                //         handler: controller.getByField,
                //         description: 'Method to get an entry by any field',
                //         auth: false,
                //     },
                // },
            ]);
            console.log('Completed - user routes');
            resolve();
        });
    }
}