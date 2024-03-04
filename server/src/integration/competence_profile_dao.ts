import {
  CompetenceProfileDTO,
  CompetenceProfilesDTO,
} from '../model/dto/competence_profiles_dto';
import {CompetenceProfile} from '../model/competence_profile';
import {Validators} from '../utilities/validators';

/**
 * This dao class handles operations on the competence_profile table in the db.
 */
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

  /**
   * This function will attempt to insert a list of competence profiles into the db from a DTO.
   * The reason to use this instead of createBulk is for better control over validation and error messages.
   * @param data a DTO containing competence profiles conforming to the format in the database.
   */
  async createAllCompetenceProfiles(data: CompetenceProfilesDTO) {
    if (!Validators.competenceProfilesObjValidator(data)) {
      throw new Error('CompetenceProfiles object is invalid in integration ');
    } else {
      Validators.competenceListValidator(
        [...data.competenceProfiles],
        null,
        true
      );
    }

    for (const entry of data.competenceProfiles) {
      const result = await this.createCompetenceProfile(entry);
      if (result === null) {
        return null;
      }
    }
    return true;
  }

  /**
   * This helper function tries to insert a single competence profile into the db.
   * @param entry a single competence profile
   */
  async createCompetenceProfile(entry: CompetenceProfileDTO) {
    try {
      await CompetenceProfile.create({
        personId: entry.personId,
        competenceId: entry.competenceId,
        yearsOfExperience: entry.yearsOfExperience,
      });
      return true;
    } catch (error) {
      console.error('Error updating the database:', error);
      throw new Error(`Could not add competence: ${entry} to the database!`);
    }
  }
}

export {CompetenceProfileDAO};
