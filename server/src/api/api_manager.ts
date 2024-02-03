import {ResponseHandler} from './response_handler';
import * as express from 'express';
import {Index} from './index';
class ApiManager {
  private static instance : ApiManager;
  private apiList: any[];
  responseHandler: ResponseHandler;
  private constructor(private app: any) {
    this.responseHandler = new ResponseHandler();
    this.apiList = [];
  }

  public static getInstance(app : express.Application): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager(app);
    }
    return ApiManager.instance;
  }

  loadAllApi() {
    const indexRouter = express.Router();
    this.app.use('', indexRouter);
    const index = new Index(this.responseHandler, indexRouter);
    index.setupRequestHandling();
    this.apiList.push(Index);
  }
}

export {ApiManager};
