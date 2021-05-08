import * as Hapi from '@hapi/hapi';
import Plugin from './plugin';
import Router from './router';
import * as DotEnv from 'dotenv';
import { createConnection } from "typeorm";
import { join } from 'path';
import config from './config';

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
			}).catch(error => {
				console.log('koneksi ke Database Gagal, '+error);	
			});

			await Plugin.registerAll(Server._instance);
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