import {QueryTypes, Sequelize} from 'sequelize';
import {User} from '../model/user';
import {ValidationError} from 'sequelize';
import {UserDTO} from '../model/dto/user_dto';
import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {UserApplicationDTO} from '../model/dto/user_application_dto';

/**
 * The class responsible for communicating with the database regarding users.
 * */
class UserDAO {
  private static instance: UserDAO;

  /**
   * Gets the singleton instance of this class.
   * @return {UserDAO} A singleton instance of the class.
   */
  public static getInstance(): UserDAO {
    if (!UserDAO.instance) {
      UserDAO.instance = new UserDAO();
    }
    return UserDAO.instance;
  }

  /**
   * Creates the DAO.
   * */
  private constructor() {}

  /**
   * Creates a new regular user in the database (with role_id 2)
   * @param {UserRegistrationDTO} registrationDetails A DTO containing the information to be stored about
   * the user wanting to register an account.
   * @param {number} role this it the role_id for the user, a fk to the role table.
   * @return {UserDTO} A DTO containing information about the user, otherwise throws an error.
   * @async
   * @todo Use validators to sanitise the input.
   * */
  async createUser(
    registrationDetails: UserRegistrationDTO,
    role: number
  ): Promise<UserDTO | null> {
    try {
      const user = await User.create({
        firstName: registrationDetails.firstName,
        lastName: registrationDetails.lastName,
        email: registrationDetails.email,
        personalIdentificationNumber: registrationDetails.personalNumber,
        username: registrationDetails.username,
        passwordHash: registrationDetails.password,
        role: role,
      });
      return this.createUserDTO(user);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      console.error('Error updating the database:', error);
      throw new Error(
        `Could not add user ${registrationDetails.username} to the database!`
      );
    }
  }

  /**
   * Searches the database for any entry matching the provided username.
   * @param {string} username The username of the user to search for as a string.
   * @return {UserDTO} A DTO containing the user's information if found,
   *                   otherwise null.
   * @async
   * @todo Use validators to sanitise the data before searching the database.
   * */
  async findUserByUsername(username: string): Promise<UserDTO | null> {
    try {
      const user = await User.findOne({
        where: {username: username},
      });

      if (user === null) {
        return null;
      } else {
        return this.createUserDTO(user);
      }
    } catch (error) {
      console.log('Error finding a user:', error);
      throw new Error('Could not search the database for a user!');
    }
  }

  /**
   * Searches the database for any entry matching the provided id.
   * @param {number} id The id of the user to search for as a string.
   * @return {UserDTO} A DTO containing the user's information if found, otherwise null.
   * @async
   */
  async findUserById(id: number): Promise<UserDTO | null> {
    try {
      const user = await User.findOne({
        where: {id: id},
      });

      if (user === null) {
        return null;
      } else {
        return this.createUserDTO(user);
      }
    } catch (error) {
      console.log('Error finding a user:', error);
      throw new Error('Could not search the database for a user!');
    }
  }

  /**
   * Converts a sequelize user object into a readonly UserDTO containing the same data.
   * @return {UserDTO} A DTO containing all information from the provided user object, or null
   *         if the provided user is null.
   * */
  createUserDTO(user: User | null): UserDTO | null {
    if (user === null) {
      return null;
    } else {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        personalIdentificationNumber: user.personalIdentificationNumber,
        username: user.username,
        passwordHash: user.passwordHash,
        role: user.role,
      };
    }
  }

  async getAllApplications(): Promise<UserApplicationDTO[]> {
    try {
      // SQL query to get all users and their application status
      const usersWithApplications = await this.database.query(
        `
        SELECT u.id, u.firstName, u.lastName, a.status
        FROM Users u
        LEFT JOIN Applications a ON u.id = a.userId
      `,
        {
          type: QueryTypes.SELECT,
        }
      );

      // Map the data to a DTO
      const applications = usersWithApplications.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
      }));

      // Return the DTOs
      return applications;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw new Error('Could not fetch applications from the database');
    }
  }
}

export {UserDAO};
