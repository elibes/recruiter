import {ResponseHandler} from './response_handler';
import {Request, Response, Router} from 'express';
import {fullApplicationDTO} from '../model/dto/full_application_dto';
import {AvailabilitiesDTO} from '../model/dto/availabilities_dto';
import Decimal from 'decimal.js';
import {CompetenceProfilesDTO} from '../model/dto/competence_profiles_dto';
import {createApplicationService} from '../service/application_service_factory';
import {checkSchema} from 'express-validator';
import {
  applicationValidationSchema,
  handleExpressValidatorErrors,
} from './validation_helper';
import Authorization from './authorization';
import {UserAuthDTO} from '../model/dto/user_auth_dto';
import {APPLICANT_ROLE_ID} from '../utilities/configurations';

/**
 * This class represents the api logic used for job application related requests.
 */
class ApplicationApi {
  constructor(
    private responseHandler: ResponseHandler,
    private router: Router
  ) {}

  /**
   * This function sets up the handling used for each operation or action defined for this route.
   * it should only be called once, by the api manager.
   */
  async setupRequestHandling() {
    this.router.post(
      '/',
      checkSchema(applicationValidationSchema),
      async (req: Request, res: Response) => {
        handleExpressValidatorErrors(req);
        const userInfo = Authorization.getUserAuth(req, APPLICANT_ROLE_ID);
        const applicationData = this.applicationDataPacker(req.body, userInfo);
        const result =
          await createApplicationService().handleApplication(applicationData);
        if (result) {
          const data = 'Application submission successful';
          this.responseHandler.sendHttpResponse(res, 200, data, false);
        }
      }
    );
  }

  /**
   * This helper function tries to build a full_application_DTO to send to the service layer handler from,
   * the JWT and form data in req.
   * @param body the body of the request
   * @param userInfo the information extracted from the JWT
   */
  applicationDataPacker(body: any, userInfo: UserAuthDTO) {
    const availabilitiesDTO: AvailabilitiesDTO = {
      availabilities: body.availabilities.map(
        (entry: {fromDate: string; toDate: string}) => {
          return {
            personId: userInfo.userId,
            fromDate: new Date(entry.fromDate),
            toDate: new Date(entry.toDate),
          };
        }
      ),
    };

    const competenciesDTO: CompetenceProfilesDTO = {
      competenceProfiles: body.competencies.map(
        (entry: {competenceId: string; yearsOfExperience: string}) => {
          return {
            personId: userInfo.userId,
            competenceId: entry.competenceId,
            yearsOfExperience: new Decimal(entry.yearsOfExperience),
          };
        }
      ),
    };

    const fullApplication: fullApplicationDTO = {
      userId: userInfo.userId,
      userRole: userInfo.roleId,
      competencies: competenciesDTO,
      availabilities: availabilitiesDTO,
    };

    return fullApplication;
  }
}

export {ApplicationApi};
