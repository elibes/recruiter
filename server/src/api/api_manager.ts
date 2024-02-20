import {ResponseHandler} from './response_handler';
import * as express from 'express';
import {RootApi} from './root_api';
import {UserApi} from './user_api';
import {ErrorHandler} from '../utilities/error_handler';
import {
  APPLICATION_API_ROUTE,
  COMPETENCE_API_ROUTE,
  ROOT_API_ROUTE,
} from '../utilities/configurations';
import {USER_API_ROUTE} from '../utilities/configurations';
import {NextFunction, Request, Response} from 'express';
import {ApplicationApi} from './application_api';
import {CompetenceApi} from './competence_api';
import {InvalidRouteError} from '../utilities/custom_errors';

/**
 * This class is singleton manager responsible for setting up all apis, only one instance should be created.
 */
class ApiManager {
  private static instance: ApiManager;
  private apiList: ApiRoute<any>[];
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
   * This method returns the global instance of the class.
   * @param app The express app to be passed into the constructor.
   * @return the global instance of the ApiManager class.
   */
  public static getInstance(app: express.Application): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager(app);
    }
    return ApiManager.instance;
  }

  /**
   * This helper function defines each main route type in the app. The route member represents the endpoint path of
   * a route (as configured in the configurations file) and the class is the api handler class that handles that route.
   * New routes should be added in the configurations file and imported for use here.
   */
  defineRoutes(): void {
    this.apiList.push({route: ROOT_API_ROUTE, class: RootApi});
    this.apiList.push({route: USER_API_ROUTE, class: UserApi});
    this.apiList.push({route: APPLICATION_API_ROUTE, class: ApplicationApi});
    this.apiList.push({route: COMPETENCE_API_ROUTE, class: CompetenceApi});
  }

  /**
   * This function creates and inserts dependencies for each route and api class pair defined by the defineRoute helper.
   *
   * It also starts a wildcard route that will be run if a request does not match any previous route, which will trigger
   * an error.
   *
   * Finally, it sets up the global errorHandling middleware. The reason this is in this class and function
   * instead of the main server file is that it must be used last, which is safer here since this function should be
   * the last middleware used in the server file.
   */
  createAllApis() {
    this.defineRoutes();
    this.apiList.forEach((entry: ApiRoute<any>) => {
      const entryRoute = express.Router();
      const entryInstance = new entry.class(this.responseHandler, entryRoute);
      entryInstance.setupRequestHandling();
      this.app.use(entry.route, entryRoute);
    });

    this.app.use(() => {
      throw new InvalidRouteError('That resource does not exist');
    });

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        this.errorHandler.handleError(err, req, res, next);
      }
    );
  }
}

/**
 * This is an interface representing the type of object expected in the apiList attribute, a route representing the
 * string and a class to handle that route.
 */
interface ApiRoute<T> {
  route: string;
  class: T;
}

export {ApiManager};
