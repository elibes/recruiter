import {Competence} from '../model/competence';
import {CompetenciesDTO} from '../model/dto/competencies_dto';
import {LanguageDAO} from "./language_dao";
import {Translation} from "../model/translation";
import {TranslationDAO} from "./translation_dao";

/**
 * This DAO class handles operations on the competence table in the db.
 */
class CompetenceDAO {
  private static instance: CompetenceDAO;

  /**
   * Gets the singleton instance of this class.
   * @return {CompetenceDAO} A singleton instance of the class.
   */
  public static getInstance(): CompetenceDAO {
    if (!CompetenceDAO.instance) {
      CompetenceDAO.instance = new CompetenceDAO();
    }
    return CompetenceDAO.instance;
  }

  /**
   * Creates the DAO
   * */
  private constructor() {}

  /**
   * This function attempts to get all rows from the competence table (competence_id and name)
   */
  async getAllCompetencies(languageId: number) {
    try {
      const result = await Competence.findAll();
      return await this.createCompetenceDTO(result, languageId);
    } catch (error) {
      console.error('Error fetching from the database:', error);
      throw new Error('Could not findAll competencies in database!');
    }
  }

  /**
   * This helper function takes a list of Competence objects from the db and converts it into a DTO.
   * @param comps the competence objects.
   * @param languageId the language id.
   */
  async createCompetenceDTO(comps: Competence[] | null, languageId: number): Promise<CompetenciesDTO | null> {
    if (comps === null || comps.length === 0) {
      return null;
    } else {
      const translationDao = TranslationDAO.getInstance();

      const competencies = await Promise.all(comps.map(async (competence) => {
        const competenceName = await translationDao.getTranslationNameByCompetenceId(languageId, competence);
        return {
          id: competence.id,
          competenceName: competenceName
        };
      }));

      return { competencies };
    }
  }
}

export {CompetenceDAO};
