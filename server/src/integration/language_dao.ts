import {Language} from "../model/language";
import {LanguageDTO} from "../model/dto/language_dto";

class LanguageDAO {
  private static instance: LanguageDAO;

  public static getInstance(): LanguageDAO {
    if (!LanguageDAO.instance) {
      LanguageDAO.instance = new LanguageDAO();
    }
    return LanguageDAO.instance;
  }

  private constructor() {}

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

  async getLanguageById(id: number) {
    try {
      const language = await Language.findOne({
        where: {id: id},
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
