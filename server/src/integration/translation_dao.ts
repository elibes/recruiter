import {Translation} from "../model/translation";
import {Competence} from "../model/competence";

class TranslationDAO {
  private static instance: TranslationDAO;

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
