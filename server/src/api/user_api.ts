import {ResponseHandler} from './response_handler';
class UserApi {
  constructor(
    private responseHandler: ResponseHandler,
    private router: any
  ) {}

  async setupRequestHandling() {
    this.router.get('/', (req: any, res: any) => {
      const data = {message: 'user API is up!'};
      const httpStatusCode = 200;
      this.responseHandler.sendHttpResponse(res, httpStatusCode, data);
    });
  }
}

export {UserApi};
