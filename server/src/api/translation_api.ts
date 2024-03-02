import {ResponseHandler} from './response_handler';
import {Request, Response, Router} from 'express';
import '../locales/sv/translation.json';
import '../locales/en/translation.json';

/**
 * This class is responsible for managing the responses to '/locales' -- the api route for
 * requesting translation JSONs.
 * */
class TranslationApi {
  /**
   * Dependencies needed for api operation are injected via this constructor.
   * @param responseHandler a handler used for formatting and sending HTTP responses.
   * @param router the express route associated with this class.
   */
  constructor(
    private responseHandler: ResponseHandler,
    private router: Router
  ) {}

  /**
   * This function sets up the handling used for each operation or action defined for this route.
   * it should only be called once, by the api manager.
   */
  async setupRequestHandling() {
    this.router.get('/', async (req: Request, res: Response) => {
      const data = 'translation API is up!';
      const httpStatusCode = 200;
      this.responseHandler.sendHttpResponse(res, httpStatusCode, data, false);
      return;
    });

    this.router.get(
      '/sv/translation.json',
      async (req: Request, res: Response) => {
        const data = require('../locales/sv/translation.json');
        res.json(data);
        return;
      }
    );

    this.router.get(
      '/en/translation.json',
      async (req: Request, res: Response) => {
        const data = require('../locales/en/translation.json');
        res.json(data);
        return;
      }
    );
  }
}

export {TranslationApi};
