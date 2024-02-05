import {Sequelize} from 'sequelize';
import User from '../model/User';
import UserRegistrationDTO from '../service/UserRegistrationDTO';
import UserDTO from '../service/UserDTO';

/**
 * The class responsible for communicating with the database regarding users.
 * */
class UserDAO {
  database: Sequelize;

  /**
   * Creates the DAO and connects to the database.
   * */
  constructor(database: Sequelize) {
    this.database = database;
    User.createModel(this.database);
  }

  /**
   * Creates a new user in the database
   * @param registrationDetails A DTO containing the information to be stored about
   *                            the user wanting to register an account.
   * @return A DTO containing information about the user, otherwise throws an error.
   * @todo Use validators to sanitise the input.
   * */
  async createUser(registrationDetails: UserRegistrationDTO) {
    try {
      const user = await User.create({
        firstName: registrationDetails.firstName,
        lastName: registrationDetails.lastName,
        email: registrationDetails.email,
        personalIdentificationNumber:
          registrationDetails.personalIdentificationNumber,
        username: registrationDetails.username,
        passwordHash: registrationDetails.passwordHash,
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
   * @todo User validators to sanitise the data before searching the database.
   * */
  async findUserByUsername(username: string) {
    try {
      const user = await User.findOne({
        where: {username: username},
      });
      return this.createUserDTO(user);
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
  createUserDTO(userModel: User | null) {
    if (userModel === null) {
      return null;
    } else {
      return new UserDTO(
        userModel.id,
        userModel.firstName,
        userModel.lastName,
        userModel.email,
        userModel.personalIdentificationNumber,
        userModel.username,
        userModel.passwordHash,
        userModel.role
        //userModel.loggedInUntil,
        //userModel.isRecrtuiter,
        //userModel.createdAt,
        //userModel.updatedAt,
        //userModel.deletedAt
      );
    }
  }
}

export default UserDAO;
