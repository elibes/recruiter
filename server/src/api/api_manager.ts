import {ResponseHandler} from './response_handler';
import * as express from 'express';
import {Index} from './index';
import {UserApi} from './user_api';
class ApiManager {
  private static instance: ApiManager;
  private apiList: any[];
  responseHandler: ResponseHandler;

  private constructor(private app: any) {
    this.responseHandler = new ResponseHandler();
    this.apiList = [];
  }

  public static getInstance(app: express.Application): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager(app);
    }
    return ApiManager.instance;
  }

  defineRoutes() {
    this.apiList.push({route: '', class: Index});
    this.apiList.push({route: '/user', class: UserApi});
  }

  createAllApis() {
    this.apiList.forEach((entry: any) => {
      const entryRoute = express.Router();
      const entryInstance = new entry.class(this.responseHandler, entryRoute);
      entryInstance.setupRequestHandling();
      this.app.use(entry.route, entryRoute);
    });
  }
}

export {ApiManager};
