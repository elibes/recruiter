import {Database} from '../integration/database';
import {CompetenceDAO} from '../integration/competence_dao';

/**
 * This class contains methods to handle request about competence names.
 */
export class CompetenceService {
  constructor() {}

  /**
   * This method services a request to get all competency names.
   */
  async getAllCompetencies() {
    const db = Database.getInstance().getDatabase();
    return await db.transaction(async transaction => {
      const competenceDAO = CompetenceDAO.getInstance();
      return await competenceDAO.getAllCompetencies();
    });
  }
}
