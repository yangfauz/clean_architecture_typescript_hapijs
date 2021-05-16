import { Auth } from './auth.entity';
import { BaseController } from '../../common/base/base.controller';
import { AuthService } from './auth-service';
import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import newResponse from '../../helper/response';


export default class AuthController extends BaseController<Auth> {
	constructor(
		public readonly authService: AuthService
	) {
		super(authService)
	}

	public register = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			let result = await this.authService.register(request.payload);
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
            console.log(error.message)
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

    public login = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			let result = await this.authService.login(request.payload);
			
			if (result != null) {
				return toolkit.response(newResponse(request, { value: result }));
			}

			throw Boom.unauthorized()
			
		} catch (error) {
			console.log('aaa')
            console.log(error.message)
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};
}