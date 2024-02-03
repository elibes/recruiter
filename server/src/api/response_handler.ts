import * as express from 'express';

class ResponseHandler {
  sendHttpResponse(
    response: any,
    httpStatusCode: number,
    responseBody: any,
    error: any
  ) {
    //add validation here

    const responseConclusion = error ? 'error' : 'success';
    response.status(httpStatusCode).json({[responseConclusion]: responseBody});
  }
}

export {ResponseHandler};
