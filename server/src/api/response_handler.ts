import {Response} from 'express';
import {ErrorMessage} from "../utilities/error_handler";

/**
 * This class is a handler responsible for formatting and returning HTTP responses to the client.
 */
class ResponseHandler {
  /**
   *
   * This function takes in relevant information about the request and formats and returns a response accordingly.
   *
   * @param response the express response.
   * @param httpStatusCode the status code to be returned.
   * @param responseBody the express response body.
   * @param error a boolean flag to inform if an error has happened during processing.
   */
  sendHttpResponse(
    response: Response,
    httpStatusCode: number,
    responseBody: any,
    error: boolean
  ) {

    let apiResponse : APIResponse<any>;
    if(error) {
      apiResponse = {success:false, error:responseBody as ErrorMessage}
    } else {
      if (!Array.isArray(responseBody)) {
        responseBody = [responseBody];
      }
      apiResponse = {success:true, data:responseBody as any[]}
    }
    response.status(httpStatusCode).json(apiResponse);
  }
}
interface SuccessResponse<T> {
  success: true;
  data: T[];
}
interface ErrorResponse {
  success: false;
  error: ErrorMessage;
}
type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

export {ResponseHandler};
