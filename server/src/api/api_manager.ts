import {ResponseHandler} from './response_handler';
import * as express from 'express';
import {Index} from './index';
class ApiManager {
  apiList: any[];
  responseHandler: ResponseHandler;
  constructor(private app: any) {
    this.responseHandler = new ResponseHandler();
    this.apiList = [];
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
