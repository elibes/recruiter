import {Database} from '../integration/database';
import {fullApplicationDTO} from '../model/dto/full_application_dto';
import {AvailabilityDAO} from '../integration/availability_dao';
import {CompetenceProfileDAO} from '../integration/competence_profile_dao';
import {UserDAO} from '../integration/user_dao';
import {ConflictError} from '../utilities/custom_errors';

export class ApplicationService {
  constructor() {}
  async handleApplication(application: fullApplicationDTO) {
    console.log(application);
    const db = Database.getInstance().getDatabase();
    if (application.userRole != 2) {
      throw new Error('Only users can post applications');
    }
    return await db.transaction(async transaction => {
      const userDAO = UserDAO.getInstance();
      const availabilityDAO = AvailabilityDAO.getInstance();
      const competenceProfileDAO = CompetenceProfileDAO.getInstance();
      const user = await userDAO.findUserById(application.userId);
      if (user === null) {
        throw new ConflictError('That user does not exist');
      }

      await availabilityDAO.createAllAvailabilities(application.availabilities);
      await competenceProfileDAO.createAllCompetenceProfiles(
        application.competencies
      );
      return true;
    });
  }
}
