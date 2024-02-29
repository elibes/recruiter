import {Language} from "../model/language";
import {LanguageDTO} from "../model/dto/language_dto";

/**
 * Data Access Object (DAO) for Language, providing an abstraction layer to interact
 * with the Language data in the database. Implements the Singleton design pattern.
 */
class LanguageDAO {
  private static instance: LanguageDAO;

  /**
   * Retrieves the singleton instance of LanguageDAO, creating it if it does not already exist.
   * @returns {LanguageDAO} The singleton instance of the LanguageDAO.
   */
  public static getInstance(): LanguageDAO {
    if (!LanguageDAO.instance) {
      LanguageDAO.instance = new LanguageDAO();
    }
    return LanguageDAO.instance;
  }

  private constructor() {}

  /**
   * Fetches a language from the database by its code.
   * @param {string} code - The code of the language to fetch.
   * @returns {Promise<LanguageDTO | null>} A promise that resolves to a LanguageDTO if found, otherwise null.
   */
  async getLanguageByCode(code: string) {
    try {
      const language = await Language.findOne({
        where: {code: code},
      });

      if(language === null) {
        return null;
      } else {
        return this.createLanguageDTO(language);
      }
    } catch (error) {
      console.error('Error fetching from the database:', error);
      throw new Error('Could not language in database!');
    }
  }

  /**
   * Converts a Language model instance to a LanguageDTO.
   * @param {Language | null} lang - The Language model instance to convert.
   * @returns {LanguageDTO | null} The corresponding LanguageDTO, or null if input is null.
   */
  createLanguageDTO(lang: Language | null): LanguageDTO | null {
    if (lang === null) {
      return null;
    } else {
      return {
          id: lang.id,
          languageCode: lang.code,
      };
    }
  }
}

export {LanguageDAO};
