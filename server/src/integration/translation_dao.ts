import {Translation} from "../model/translation";
import {Competence} from "../model/competence";

/**
 * Data Access Object (DAO) for Translation, providing an abstraction layer to interact
 * with translation data in the database. Implements the Singleton design pattern.
 */
class TranslationDAO {
  private static instance: TranslationDAO;

  /**
   * Retrieves the singleton instance of TranslationDAO, creating it if it does not already exist.
   * @returns {TranslationDAO} The singleton instance of the TranslationDAO.
   */
  public static getInstance(): TranslationDAO {
    if (!TranslationDAO.instance) {
      TranslationDAO.instance = new TranslationDAO();
    }
    return TranslationDAO.instance;
  }

  /**
   * Creates the DAO
   * */
  private constructor() {}

  /**
   * Fetches the translation name for a given competence and language ID.
   * If a translation is not found, it returns the default competence name.
   * @param {number} languageId - The ID of the language for the translation.
   * @param {Competence} competence - The competence for which the translation is being fetched.
   * @returns {Promise<string>} A promise that resolves to the translation name or the default competence name if the translation is not found.
   */
  async getTranslationNameByCompetenceId(languageId: number, competence: Competence): Promise<string> {
    try {
      const translation = await Translation.findOne({
        where: {
          languageId: languageId,
          competenceId: competence.id
        },
      });

      if(translation === null) {
        console.log(`Translation not found for languageId: ${languageId}, competenceId: ${competence.id}`);
        return competence.name;  // return the default name
      } else {
        return translation.name;
      }
    } catch (error) {
      console.error('Error fetching from the database:', error);
      throw new Error('Could not find that translation in database!');
    }
  }
}

export {TranslationDAO};
