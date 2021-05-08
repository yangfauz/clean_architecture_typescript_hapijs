import Config from '../config';
import * as Hapi from '@hapi/hapi';

export default class Plugins {
    public static async status(server: Hapi.Server): Promise<Error | any> {
      try {
        console.log('Plugins - Registering status-monitor');
        await Plugins.register(server, {
          options: Config.status.options,
          plugin: require('hapijs-status-monitor'),
        });
      } catch (error) {
        console.log('Plugins - Ups, something went wrong when registering status plugin:' + error);
      }
    }
  
    public static async registerAll(server: Hapi.Server): Promise<Error | any> {
      if (process.env.NODE_ENV === 'development') {
        await Plugins.status(server);
      }
    }
  
    private static async register(
      server: Hapi.Server,
      plugin: any
    ): Promise<void> {
      console.log('registering'+ plugin);
      return new Promise((resolve, reject) => {
        server.register(plugin);
        resolve();
      });
    }
  }