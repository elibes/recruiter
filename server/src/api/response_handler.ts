import {Response} from 'express';

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
    const responseConclusion = error ? 'error' : 'success';
    response.status(httpStatusCode).json({[responseConclusion]: responseBody});
  }
}

export {ResponseHandler};
