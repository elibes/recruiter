import {ResponseHandler} from './response_handler';
import {Request, Response, Router} from 'express';
import '../locales/sv/translation.json';
import '../locales/en/translation.json';

class TranslationApi {
  constructor(
    private responseHandler: ResponseHandler,
    private router: Router
  ) {}

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
        console.log('Sent swedish translation!');
        return;
      }
    );

    this.router.get(
      '/en/translation.json',
      async (req: Request, res: Response) => {
        const data = require('../locales/en/translation.json');
        res.json(data);
        console.log('Sent english translation!');
        return;
      }
    );
  }
}

export {TranslationApi};
