import {Competence} from '../model/competence';
import {CompetenciesDTO} from '../model/dto/competencies_dto';

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

  async getAllCompetencies() {
    try {
      const result = await Competence.findAll();
      return this.createCompetenceDTO(result);
    } catch (error) {
      console.error('Error fetching from the database:', error);
      throw new Error('Could not findAll competencies in database!');
    }
  }

  createCompetenceDTO(comps: Competence[] | null): CompetenciesDTO | null {
    if (comps === null || comps.length === 0) {
      return null;
    } else {
      return {
        competencies: comps.map(competence => ({
          id: competence.id,
          competenceName: competence.name,
        })),
      };
    }
  }
}

export {CompetenceDAO};
