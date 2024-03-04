import {Competence} from '../model/competence';
import {CompetenciesDTO} from '../model/dto/competencies_dto';
import {Language} from "../model/language";
import {Translation} from "../model/translation";

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
   * Fetches all competencies from the database and returns them in the specified language.
   * This method utilizes a join with the `Translation` and `Language` models to filter competencies
   * based on the provided language code. If the specified language is not found, it throws an error.
   */
  async getAllCompetencies(languageCode: string) {
    try {
      const result = await Competence.findAll({
        include: [{
          model: Translation,
          as: 'competenceInTranslation',
          required: true,
          include: [{
            model: Language,
            as: 'languageInTranslation',
            where: {
              code: languageCode
            },
            required: true
          }]
        }]
      })
      return this.createCompetenceDTO(result);
    } catch (error) {
      console.error('Error fetching from the database:', error);
      throw new Error('Could not findAll competencies in database!');
    }
  }
  
  /**
   * This helper function takes a list of Competence objects from the db and converts it into a DTO.
   * @param comps the competence objects.
   */
  createCompetenceDTO(comps: Competence[] | null): CompetenciesDTO | null {
    if (comps === null || comps.length === 0) {
      return null;
    } else {
      return {
        competencies: comps.map(competence => {
          const competenceName = competence.competenceInTranslation?.[0]?.name ?? competence.name;
          return {
            id: competence.id,
            competenceName: competenceName,
          };
        }),
      };
    }
  }
}



  export {CompetenceDAO};
