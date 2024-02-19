import {Database} from '../integration/database';
import {CompetenceDAO} from '../integration/competence_dao';

export class CompetenceService {
  constructor() {}

  async getCompetencies() {
    const db = Database.getInstance().getDatabase();
    return await db.transaction(async transaction => {
      const competenceDAO = CompetenceDAO.getInstance();
      return await competenceDAO.getAllCompetencies();
    });
  }
}
