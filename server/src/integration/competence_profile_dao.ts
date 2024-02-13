import {
  CompetenceProfileDTO,
  CompetenceProfilesDTO,
} from '../model/dto/competence_profiles_dto';
import {CompetenceProfile} from '../model/competence_profile';
import {Transaction} from 'sequelize';

class CompetenceProfileDAO {
  private static instance: CompetenceProfileDAO;

  /**
   * Gets the singleton instance of this class.
   * @return {CompetenceProfileDAO} A singleton instance of the class.
   */
  public static getInstance(): CompetenceProfileDAO {
    if (!CompetenceProfileDAO.instance) {
      CompetenceProfileDAO.instance = new CompetenceProfileDAO();
    }
    return CompetenceProfileDAO.instance;
  }
  private constructor() {}

  async createAllCompetenceProfiles(
    data: CompetenceProfilesDTO,
    transaction: Transaction
  ) {
    for (const entry of data.competenceProfiles) {
      const result = await this.createCompetenceProfile(entry, transaction);
      if (result === null) {
        return null;
      }
    }
    return true;
  }

  async createCompetenceProfile(
    entry: CompetenceProfileDTO,
    transaction: Transaction
  ) {
    try {
      await CompetenceProfile.create(
        {
          personId: entry.personId,
          competenceId: entry.competenceId,
          yearsOfExperience: entry.yearsOfExperience,
        },
        {transaction}
      );
      return true;
    } catch (error) {
      console.error('Error updating the database:', error);
      throw new Error(`Could not add competence: ${entry} to the database!`);
    }
  }
}

export {CompetenceProfileDAO};
