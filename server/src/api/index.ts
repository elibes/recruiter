import {ResponseHandler} from './response_handler';
class Index {
  constructor(
    private responseHandler: ResponseHandler,
    private router: any
  ) {}

  async setupRequestHandling() {
    this.router.get('/', (req: any, res: any) => {
      const data = {message: 'API is up and running!'};
      const httpStatusCode = 200;
      this.responseHandler.sendHttpResponse(res, httpStatusCode, data);
    });
  }
}

export {Index};
