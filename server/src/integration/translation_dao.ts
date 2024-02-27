import {TranslationDTO} from "../model/dto/translation_dto";
import {Translation} from "../model/translation";

class TranslationDAO {
  private static instance: TranslationDAO;

  public static getInstance(): TranslationDAO {
    if (!TranslationDAO.instance) {
      TranslationDAO.instance = new TranslationDAO();
    }
    return TranslationDAO.instance;
  }
  private constructor() {}

  async createTranslation(entry: TranslationDTO) {
    try {
      await Translation.create({
        competenceId: entry.competenceId,
        languageId: entry.languageId,
        translationName: entry.translationName,
      });
      return true;
    } catch (error) {
      console.error('Error updating the database:', error);
      throw new Error(`Could not add translation: ${entry} to the database!`);
    }
  }
}

export {TranslationDAO};
