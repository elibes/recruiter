import {Database} from '../integration/database';
import {CompetenceDAO} from '../integration/competence_dao';

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
}
