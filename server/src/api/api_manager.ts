import {ResponseHandler} from './response_handler';
import * as express from 'express';
import {Index} from './index';
import {UserApi} from './user_api';
import {ErrorHandler} from './error_handler';

/**
 * This class is singleton manager responsible for setting up all apis, only one instance should be created.
 */
class ApiManager {
  private static instance: ApiManager;
  private apiList: any[];
  responseHandler: ResponseHandler;
  errorHandler: ErrorHandler;

  /**
   * This is a private constructor for the singleton class, only to be called by the getInstance method once.
   *
   * It creates instances of other handlers that it needs.
   *
   * @param app this is the express app, needed to define routes.
   * @private
   */
  private constructor(private app: express.Application) {
    this.responseHandler = new ResponseHandler();
    this.errorHandler = new ErrorHandler(this.responseHandler);
    this.apiList = [];
  }

  /**
   * This is the method to create the single instance required of this class.
   * @param app The express app to be passed into the constructor.
   */
  public static getInstance(app: express.Application): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager(app);
    }
    return ApiManager.instance;
  }

  /**
   * This helper function defines each main route type in the app by adding the route name and the corresponding
   * api class to the apiList attribute.
   */
  defineRoutes() {
    this.apiList.push({route: '', class: Index});
    this.apiList.push({route: '/user', class: UserApi});
  }

  /**
   * This function creates and inserts dependencies for each route and api class pair defined by the defineRoute helper.
   *
   * It also sets up the global errorHandling middleware. The reason this is in this class and function
   * instead of the main server file is that it must be used last, which is safer here since this function should be
   * the last middleware used in the server file.
   */
  createAllApis() {
    this.defineRoutes();
    this.apiList.forEach((entry: any) => {
      const entryRoute = express.Router();
      const entryInstance = new entry.class(
        this.responseHandler,
        this.errorHandler,
        entryRoute
      );
      entryInstance.setupRequestHandling();
      this.app.use(entry.route, entryRoute);
    });

    this.app.use((err: any, req: any, res: any, next: any) => {
      this.errorHandler.handleError(err, req, res, next);
    });
  }
}

export {ApiManager};
