import {ConflictError} from './custom_errors';
import {ValidationSanitizationError} from './custom_errors';
import {ResponseHandler} from '../api/response_handler';
import {NextFunction, Request, Response} from 'express';

/**
 * The purpose of this class is to facilitate error handling in the api layer.
 */
class ErrorHandler {
  constructor(private responseHandler: ResponseHandler) {}
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
      message = "something went wrong on the server"
    }
    this.responseHandler.sendHttpResponse(res, httpStatusCode, message, true);
    return;
  }
}

export {ErrorHandler};
