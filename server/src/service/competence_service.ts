import {Database} from '../integration/database';
import {CompetenceDAO} from '../integration/competence_dao';
import {LanguageDAO} from "../integration/language_dao";
import {LanguageNotFoundError} from "../utilities/custom_errors";

/**
 * This class contains methods to handle request about competence names.
 */
export class CompetenceService {
  constructor() {}

  /**
   * This method services a request to get all competency names.
   */
  async getAllCompetencies(languageCode: string) {
    const db = Database.getInstance().getDatabase();
    return await db.transaction(async transaction => {
      const languageDao = LanguageDAO.getInstance();
      const competenceDAO = CompetenceDAO.getInstance();

      const language = await languageDao.getLanguageByCode(languageCode);
      if(language === null) {
        throw new LanguageNotFoundError(`Language with ${languageCode} code does not exit`);
      }
      return await competenceDAO.getAllCompetencies(language.id);
    });
  }
}
