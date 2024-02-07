import {ConflictError} from '../utilities/custom_errors';
import {ValidationSanitizationError} from '../utilities/custom_errors';

/**
 * The purpose of this class is to facilitate error handling in the api layer.
 */
class ErrorHandler {
  constructor(private responseHandler: any) {}

  /**
   * Used to wrap a route so that both async and sync errors will be handled by the next middleware
   * (the next middleware should be an error handling middleware.)
   * @param fn a function (route endpoint) to wrap
   */
  asyncErrorWrapper(fn: any) {
    return async (req: any, res: any, next: any) => {
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
   * @param err the error to be handled
   * @param req the express request
   * @param res the express response
   * @param next the next middleware to be called
   */
  handleError(err: any, req: any, res: any, next: any) {
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
