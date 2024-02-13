import {Database} from '../integration/database';
import {CompetenceDAO} from '../integration/competence_dao';
import {fullApplicationDTO} from '../model/dto/full_application_dto';
import {AvailabilityDAO} from '../integration/availability_dao';
import {CompetenceProfileDAO} from '../integration/competence_profile_dao';
import {UserDAO} from '../integration/user_dao';
import {ConflictError} from '../utilities/custom_errors';

export class ApplicationService {
  constructor() {}

  async getCompetencies() {
    const db = Database.getInstance().database;
    try {
      return await db.transaction(async transaction => {
        const competenceDAO = CompetenceDAO.getInstance();
        return await competenceDAO.getAllCompetencies(transaction);
      });
    } catch (error) {
      throw error;
    }
  }

  async handleApplication(application: fullApplicationDTO) {
    const db = Database.getInstance().database;
    try {
      return await db.transaction(async transaction => {
        const userDAO = UserDAO.getInstance();
        const availabilityDAO = AvailabilityDAO.getInstance();
        const competenceProfileDAO = CompetenceProfileDAO.getInstance();
        const user = await userDAO.findUserById(application.userId);
        if (user === null) {
          throw new ConflictError('That user does not exist');
        }
        await availabilityDAO.createAllAvailabilities(
          application.availabilities,
          transaction
        );
        await competenceProfileDAO.createAllCompetenceProfiles(
          application.competencies,
          transaction
        );
        return true;
      });
    } catch (error) {
      throw error;
    }
  }
}
