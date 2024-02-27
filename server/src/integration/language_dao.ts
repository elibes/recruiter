import {Language} from "../model/language";
import {LanguagesDTO} from "../model/dto/language_dto";

class LanguageDAO {
  private static instance: LanguageDAO;

  public static getInstance(): LanguageDAO {
    if (!LanguageDAO.instance) {
      LanguageDAO.instance = new LanguageDAO();
    }
    return LanguageDAO.instance;
  }

  private constructor() {}

  async getAllLanguages() {
    try {
      const result = await Language.findAll();
      return this.createLanguageDTO(result);
    } catch (error) {
      console.error('Error fetching from the database:', error);
      throw new Error('Could not findAll competencies in database!');
    }
  }

  createLanguageDTO(lang: Language[] | null): LanguagesDTO | null {
    if (lang === null || lang.length === 0) {
      return null;
    } else {
      return {
        languages: lang.map(language => ({
          id: language.id,
          languageName: language.name,
        })),
      };
    }
  }
}

export {LanguageDAO};
