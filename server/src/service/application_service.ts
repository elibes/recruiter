import {Database} from '../integration/database';

export class ApplicationService {
  constructor() {}

  async getCompetencies() {
    const db = Database.getInstance().database;
  }
}
