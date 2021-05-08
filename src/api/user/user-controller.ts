import { User } from './user.entity';
import { BaseController } from '../../common/base/base.controller';
import { UserService } from './user-service';
import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import newResponse from '../../helper/response';

export default class UserController extends BaseController<User> {
	constructor(
		public readonly userService: UserService
	) {
		super(userService)
	}

    public getAll = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
            console.log('GET All User')
			let result = await this.userService.getAll();
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

	public getById = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			const id: any = encodeURIComponent(request.params.id);
			let result = await this.userService.get(id);
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
            console.log(error.message)
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

	public create = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			let result = await this.userService.create(request.payload);
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
            console.log(error.message)
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

	public update = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			const id: any = encodeURIComponent(request.params.id);
			let updatedEntity = await this.userService.update(id, request.payload);
			if (!updatedEntity) {
				return toolkit.response(newResponse(request, { boom: Boom.notFound() }));
			}
			return toolkit.response(newResponse(request, { value: updatedEntity }));
		} catch (error) {
            console.log(error.message)
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

	public delete = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			const id: any = encodeURIComponent(request.params.id);
			let result = await this.userService.delete(id);
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
            console.log(error.message)
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};
}