import {ConflictError} from './custom_errors';
import {ValidationSanitizationError} from './custom_errors';
import {ResponseHandler} from '../api/response_handler';
import {NextFunction, Request, Response} from 'express';

/**
 * This class acts as a centralized error handler for the entire application.
 * It does/shall:
 * Log comprehensive error data,
 * Standardize error responses,
 * Decide what to do with the error: attempting recovery when appropriate/possible or
 * composing informative error messages, masking sensitive or technical information.
 *
 */
class ErrorHandler {
  constructor(private responseHandler: ResponseHandler) {}

  /**
   * This is a middleware to handle errors.
   *
   * It will receive an error, @param err, set the appropriate http status code and then construct an errorMessage,
   * to then be sent to response handler.
   *
   * eslint is disabled to not complain about unused req and next, which are mandatory in an express
   * error handling middleware.
   *
   * @param err the error to be handled
   * @param req the express request
   * @param res the express response
   * @param next the next middleware to be called
   * @todo Add full error logging here later.
   */
  // eslint-disable-next-line
  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    let httpStatusCode;
    let errorMessage : ErrorMessage = {message: 'none'}

    switch(err.constructor) {
      case ConflictError:
        httpStatusCode = 409;
        errorMessage.message = 'That user already exists';
        break;

      case ValidationSanitizationError:
        httpStatusCode = 400;
        errorMessage.message = err.message
        break;

      default:
        httpStatusCode = 500;
        errorMessage.message = 'Something went wrong with the server'
        break;
    }
    this.responseHandler.sendHttpResponse(res, httpStatusCode, errorMessage, true);
    return;
  }
}

/**
 * This interface defines a standard error message to be sent as a response to the client.
 */
export interface ErrorMessage {
  message: string,
  code?: string,
  details?: string
}

export {ErrorHandler};
