import { Repository } from 'typeorm';
import { BaseService } from '../../common/base/base.service';
import { Auth } from './auth.entity';
import { getToken, createHash, comparePassword } from "../../helper/hash-config";

export class AuthService extends BaseService<Auth> {
	constructor(
		public readonly authRepository: Repository<Auth>) {
		super(authRepository);
	}

	public async register(entity: any): Promise<Auth> {
		try {
            entity.password = await createHash(entity.password);
			return await this.authRepository.save(entity);
		} catch (error) {
			throw error;
		}
	}

    public async login(entity: any): Promise<Auth> {
		try {
			let id_user_result = null;
			let email = entity.email
			const res = await this.authRepository.findOne({ where: { email } })
			res.password = res.password.replace('$2y', '$2b');

			let result_pass = await comparePassword(entity.password, res.password);

			if(result_pass){
				id_user_result = await getToken(res.id);
			}

			return id_user_result;

		} catch (error) {
			throw error;
		}
	}
}