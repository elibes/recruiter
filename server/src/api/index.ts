/**
 * This class represents the default api route reached by not specifying a resource or action
 */
class Index {
  /**
   * Dependencies needed for api operation are injected via this constructor.
   * @param responseHandler a handler used for formatting and sending HTTP responses.
   * @param errorHandler a handler used for enabling error handling.
   * @param router the express route associated with this class.
   */
  constructor(
    private responseHandler: any,
    private errorHandler: any,
    private router: any
  ) {}

  /**
   * This function sets up the handling used for each resource in this route, it will be called only once
   * ,by the api manager.
   */
  async setupRequestHandling() {
    this.router.get(
      '/',
      this.errorHandler.asyncErrorWrapper((req: any, res: any) => {
        const data = {message: 'API is up and running!'};
        const httpStatusCode = 200;
        this.responseHandler.sendHttpResponse(res, httpStatusCode, data, false);
      })
    );
  }
}

export {Index};
