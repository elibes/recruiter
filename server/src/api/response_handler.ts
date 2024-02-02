import * as express from 'express';

class ResponseHandler {
  sendHttpResponse(
    response: express.Response,
    httpStatusCode: number,
    responseBody: any
  ) {
    //add validation here
    const responseConclusion = 'success';
    response.status(httpStatusCode).json({[responseConclusion]: responseBody});
  }
}

export {ResponseHandler};
