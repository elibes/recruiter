class Index {
  constructor(
    private responseHandler: any,
    private errorHandler: any,
    private router: any
  ) {}

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
