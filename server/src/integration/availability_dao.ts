import {
  AvailabilitiesDTO,
  AvailabilityDTO,
} from '../model/dto/availabilities_dto';
import {Availability} from '../model/availability';

/**
 * This class handles db operations on the availability table.
 */
class AvailabilityDAO {
  private static instance: AvailabilityDAO;

  /**
   * Gets the singleton instance of this class.
   * @return {AvailabilityDAO} A singleton instance of the class.
   */
  public static getInstance(): AvailabilityDAO {
    if (!AvailabilityDAO.instance) {
      AvailabilityDAO.instance = new AvailabilityDAO();
    }
    return AvailabilityDAO.instance;
  }
  private constructor() {}

  /**
   * This function take a list of availabilities formatted to conform to the db table and tries to insert them all
   * into the db. The reason to use this instead of createBulk is for better control over validation and error messages.
   * @param data the availabilities, with each entry formatted to the db table specification.
   */
  async createAllAvailabilities(data: AvailabilitiesDTO) {
    for (const entry of data.availabilities) {
      const result = await this.createAvailability(entry);
      if (result === null) {
        return null;
      }
    }
    return true;
  }

  /**
   * This helper function tries to insert a single availability row into the db.
   * @param entry a single availability, formatted to the db table specification.
   */
  async createAvailability(entry: AvailabilityDTO) {
    try {
      await Availability.create({
        personId: entry.personId,
        fromDate: entry.fromDate,
        toDate: entry.toDate,
      });
      return true;
    } catch (error) {
      console.error('Error updating the database:', error);
      throw new Error(`Could not add availability: ${entry} to the database!`);
    }
  }
}

export {AvailabilityDAO};
