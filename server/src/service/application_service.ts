import {Database} from '../integration/database';
import {fullApplicationDTO} from '../model/dto/full_application_dto';
import {AvailabilityDAO} from '../integration/availability_dao';
import {CompetenceProfileDAO} from '../integration/competence_profile_dao';
import {UserDAO} from '../integration/user_dao';
import {AuthorizationError} from '../utilities/custom_errors';
import {checkUser} from './error_helper';
import {APPLICANT_ROLE_ID} from '../utilities/configurations';

/**
 * This class contains methods to service requests related to job applications.
 */
export class ApplicationService {
  constructor() {}

  /**
   * Handles the business related logic of a job application submission request. Applying some logic to check if the
   * operation should be performed and then calls the integration layer to insert into appropriate tables in the db.
   * @param application A DTO containing all information needed for a job application.
   */
  async handleApplication(application: fullApplicationDTO) {
    const db = Database.getInstance().getDatabase();
    if (application.userRole !== APPLICANT_ROLE_ID) {
      throw new AuthorizationError(
        'Only regular users are allowed to post job applications, userId: ' +
          application.userId +
          ' is not a regular user'
      );
    }
    return await db.transaction(async transaction => {
      const userDAO = UserDAO.getInstance();
      const availabilityDAO = AvailabilityDAO.getInstance();
      const competenceProfileDAO = CompetenceProfileDAO.getInstance();

      const userData = await userDAO.findUserById(application.userId);
      checkUser(application.userId, application.userRole, userData);
      await availabilityDAO.createAllAvailabilities(application.availabilities);
      await competenceProfileDAO.createAllCompetenceProfiles(
        application.competencies
      );
      return true;
    });
  }
}
