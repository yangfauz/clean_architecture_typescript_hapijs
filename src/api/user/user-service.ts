import { Repository } from 'typeorm';
import { BaseService } from '../../common/base/base.service';
import { User } from './user.entity';

export class UserService extends BaseService<User> {
	constructor(
		public readonly userRepository: Repository<User>) {
		super(userRepository);
	}

	public async getAll(): Promise<User[]> {
		try {
			return await this.userRepository.find();
		} catch (error) {
			throw error;
		}
	}

	public async get(id: number): Promise<User> {
		try {
			return await this.userRepository.findOne({where: {id: id}});
		} catch (error) {
			throw error;
		}
	}

	public async create(entity: any): Promise<User> {
		try {
			return await this.userRepository.save(entity);
		} catch (error) {
			throw error;
		}
	}

	public async update(id: number, entity: any): Promise<any> {
		try {
			// entity.modified_date = new Date();
			return await this.userRepository.update(id, entity);
		} catch (error) {
			throw error;
		}
	}

	public async delete(id: number): Promise<any> {
		try {
			return await this.userRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}