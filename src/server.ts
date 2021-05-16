import * as Hapi from '@hapi/hapi';
import Plugin from './plugin';
import Router from './router';
import * as DotEnv from 'dotenv';
import { createConnection } from "typeorm";
import { join } from 'path';
import config from './config';

import * as hapiJwt from 'hapi-auth-jwt2'
import {User} from './api/user/user.entity'
//import config from './config';
import {validateUserId} from "./helper/hash-config";

export default class Server {
	private static _instance: Hapi.Server;
	public static async start(): Promise<Hapi.Server> {
		try {
			DotEnv.config({
				path: `${process.cwd()}/.env`,
			});

			Server._instance = new Hapi.Server({
				port: process.env.PORT,
			});

			await createConnection({
				type: "postgres",
				host: `${config.dbConfig.host}`,
				port: config.dbConfig.port,
				username: `${config.dbConfig.username}`,
				password: `${config.dbConfig.password}`,
				database: `${config.dbConfig.database}`,
				entities: [join(__dirname, `${config.dbConfig.entities}`)]
			}).then(async (connection) => {
				console.log('Konek ke Database Sukses');

				await Plugin.registerAll(Server._instance);

				//JWT
				Server._instance.register([hapiJwt]);
				const userRepo = connection.getRepository(User)
				Server._instance.auth.strategy('jwt', 'jwt', {
					key: config.token.secret_key,
					validate: validateUserId(userRepo),
					verifyOptions: { algorithms: ['HS256'] }
				})
				Server._instance.auth.default('jwt')

			}).catch(error => {
				console.log('koneksi ke Database Gagal, '+error);	
			});

			await Router.loadRoutes(Server._instance);
			
			await Server._instance.start();

			return Server._instance;
		} catch (error) {
			console.log('ada masalah di server, '+error);
			throw error;
		}
	}

	public static stop(): Promise<Error | void> {
		console.log('Server berhenti eksekusi');
		return Server._instance.stop();
	}

	public static async recycle(): Promise<Hapi.Server> {
		console.log('Server Recycling instance');
		await Server.stop();
		return await Server.start();
	}

	public static instance(): Hapi.Server {
		return Server._instance;
	}

	public static async inject(
		options: string | Hapi.ServerInjectOptions
	): Promise<Hapi.ServerInjectResponse> {
		return await Server._instance.inject(options);
	}
}