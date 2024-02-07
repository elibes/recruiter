import {ConflictError} from '../utilities/custom_errors';
import {ValidationSanitizationError} from '../utilities/custom_errors';
import {ResponseHandler} from './response_handler';
import {NextFunction, Request, Response} from 'express';

/**
 * The purpose of this class is to facilitate error handling in the api layer.
 */
class ErrorHandler {
  constructor(private responseHandler: ResponseHandler) {}

  /**
   * Used to wrap a route so that both async and sync errors will be handled by the next middleware
   * (the next middleware should be an error handling middleware.)
   * @param fn a function (route endpoint) to wrap
   */
  asyncErrorWrapper(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }

  /**
   * This is a middleware to handle errors.
   *
   * It will receive an error, @param err, and set an appropriate code and message for the response,
   * depending on the error type. Then it calls another handler to send the response.
   *
   * eslint is disabled to not complain about unused req and next, which are mandatory in an express
   * error handling middleware.
   *
   * @param err the error to be handled
   * @param req the express request
   * @param res the express response
   * @param next the next middleware to be called
   */

  // eslint-disable-next-line
  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    let httpStatusCode;
    let message;
    if (err instanceof ConflictError) {
      httpStatusCode = 409;
      message = 'That user already exists';
    } else if (err instanceof ValidationSanitizationError) {
      httpStatusCode = 400;
      message = err.message;
    } else {
      httpStatusCode = 500;
    }
    this.responseHandler.sendHttpResponse(res, httpStatusCode, message, true);
    return;
  }
}

export {ErrorHandler};
