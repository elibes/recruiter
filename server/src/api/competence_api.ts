import {Request, Response, Router} from 'express';
import {ResponseHandler} from './response_handler';
import {createCompetenceService} from '../service/competence_service_factory';

/**
 * This class represents the default api route reached by not specifying a resource or action
 */
class CompetenceApi {
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
   * This function sets up the handling used for each resource in this route, it will be called only once
   * ,by the api manager.
   */
  async setupRequestHandling() {
    this.router.get('/all', async (req: Request, res: Response) => {
      const languageCode = req.headers['accept-language'] as string;
      const data = await createCompetenceService().getAllCompetencies(languageCode);
      this.responseHandler.sendHttpResponse(res, 200, data, false);
    });
  }
}

export {CompetenceApi};
