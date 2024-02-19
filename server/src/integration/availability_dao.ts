import {
  AvailabilitiesDTO,
  AvailabilityDTO,
} from '../model/dto/availabilities_dto';
import {Availability} from '../model/availability';

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

  async createAllAvailabilities(data: AvailabilitiesDTO) {
    for (const entry of data.availabilities) {
      const result = await this.createAvailability(entry);
      if (result === null) {
        return null;
      }
    }
    return true;
  }

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
