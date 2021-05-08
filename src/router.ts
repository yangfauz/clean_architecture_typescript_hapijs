import * as Hapi from '@hapi/hapi';
import UserRoutes from './api/user/user-routes';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    console.log('Router - Started adding routes');
    await new UserRoutes().register(server);
    console.log('Router - Completed adding routes');
  }
}
