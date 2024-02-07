import {Sequelize} from 'sequelize';
import {User} from '../model/user';
import UserDTO from '../service/userDTO';
import {userRegistrationData} from '../utilities/data_interfaces';

/**
 * The class responsible for communicating with the database regarding users.
 * */
class UserDAO {
  private static instance: UserDAO;
  database: Sequelize;

  /**
   * Gets the singleton instance of this class.
   * @param database the Sequelize instance.
   */
  public static getInstance(database: Sequelize): UserDAO {
    if (!UserDAO.instance) {
      UserDAO.instance = new UserDAO(database);
    }
    return UserDAO.instance;
  }

  /**
   * Creates the DAO and connects to the database.
   * */
  private constructor(database: Sequelize) {
    this.database = database;
    User.createModel(this.database);
  }

  /**
   * Creates a new regular user in the database (with role_id 2)
   * @param registrationDetails A DTO containing the information to be stored about
   *                            the user wanting to register an account.
   * @return A DTO containing information about the user, otherwise throws an error.
   * @todo Use validators to sanitise the input.
   * */
  async createUser(registrationDetails: userRegistrationData) {
    try {
      const user = await User.create({
        firstName: registrationDetails.firstName,
        lastName: registrationDetails.lastName,
        email: registrationDetails.email,
        personalIdentificationNumber: registrationDetails.personalNumber,
        username: registrationDetails.username,
        passwordHash: registrationDetails.password,
        role: 2,
      });
      return this.createUserDTO(user);
    } catch (error) {
      console.error('Error updating the database:', error);
      throw new Error(
        `Could not add user ${registrationDetails.username} to the database!`
      );
    }
  }

  /**
   * Searches the database for any entry matching the provided username.
   * @param username The username of the user to search for as a string.
   * @return A DTO containing the user's information if found,
   *          otherwise null.
   * @todo Use validators to sanitise the data before searching the database.
   * */
  async findUserByUsername(username: string) {
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
   * Converts a sequelize user object into a readonly UserDTO containing the same data.
   * @return A DTO containing all information from the provided user object, or null
   *         if the provided user is null.
   * */
  createUserDTO(user: User | null) {
    if (user === null) {
      return null;
    } else {
      return new UserDTO(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.personalIdentificationNumber,
        user.username,
        user.passwordHash,
        user.role
      );
    }
  }
}

export {UserDAO};
