import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {
  ConflictError,
  LoginPasswordNotMatchError,
  UserNotFoundError,
} from '../utilities/custom_errors';
import {Database} from '../integration/database';
import {UserDAO} from '../integration/user_dao';
import {AuthenticationService} from './authentication_service';
import {APPLICANT_ROLE_ID} from '../utilities/configurations';
import {UserLoginDTO} from '../model/dto/user_login_dto';
import {UserDTO} from '../model/dto/user_dto';
import {UserAuthDTO} from '../model/dto/user_auth_dto';
import {UserApplicationDTO} from '../model/dto/user_application_dto';
import {UserFromTokenDTO} from '../model/dto/user_from_token_dto';
import * as bcrypt from 'bcrypt';

/**
 * This class implements the logic for handling user related operations.
 */
export class UserService {
  constructor() {}

  /**
   * This function handles the register user operation.
   * @param {UserRegistrationDTO} data the validated and sanitized registration data passed through the presentation layer.
   * @return {boolean} A promise that will be true if the registration was successful and handled by the api layer.
   * @async
   */
  async handleRegistration(data: UserRegistrationDTO): Promise<boolean> {
    const db = Database.getInstance().database;
    const dataRollbackState = {...data};

    const transaction = await db.transaction();

    try {
      const userDAO = UserDAO.getInstance(db);
      const result = await userDAO.findUserByUsername(data.username);
      if (result !== null) {
        throw new ConflictError('That username already exists');
      }
      const hashedPassword = await AuthenticationService.hashPassword(
        data.password
      );

      const regData: UserRegistrationDTO = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: hashedPassword,
        personalNumber: data.personalNumber,
        email: data.email,
      };
      await userDAO.createUser(regData, APPLICANT_ROLE_ID);
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      data = dataRollbackState;
      console.error('Transaction failed:', error);
      if (error instanceof ConflictError) {
        //todo, how to deal with different errors?
        throw error;
      } else {
        throw error;
      }
    }
  }

  /**
   * Handles user login by verifying the provided username and password.
   * It checks if the user exists and if the password matches the stored password hash.
   *
   * @param {UserLoginDTO} data - The user's login credentials including username and password.
   * @returns {Promise<UserDTO>} A promise that resolves to the UserDTO of the logged-in user.
   * @throws {UserNotFoundError} Thrown if no user is found with the provided username.
   * @throws {LoginPasswordNotMatchError} Thrown if the provided password does not match the stored password hash.
   * @async
   */
  async handleLogin(data: UserLoginDTO): Promise<UserDTO> {
    const db = Database.getInstance().database;

    try {
      const userDao = UserDAO.getInstance(db);
      const user = await userDao.findUserByUsername(data.username);
      if (!user) {
        throw new UserNotFoundError(
          `User with username ${data.username} not found.`
        );
      }
      const passwordMatch = await bcrypt.compare(
        data.password,
        user.passwordHash
      );
      if (!passwordMatch) {
        throw new LoginPasswordNotMatchError('Password is invalid');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Checks if a user with the given username exists in the database.
   *
   * This function queries the database for a user with the specified username. If the user exists,
   * it returns the user's data. This can be used to verify if a user is logged in by checking if
   * their account exists in the system. The function throws an error if the user is not found.
   *
   * @param {string} username - The username of the user to check.
   * @returns {Promise<UserDTO>} A promise that resolves to the user's data if the user exists.
   * @throws {UserNotFoundError} If no user with the given username is found in the database.
   * @async
   */

  async isLoggedIn(username: string): Promise<UserDTO> {
    const db = Database.getInstance().database;

    try {
      const userDao = UserDAO.getInstance(db);
      const user = await userDao.findUserByUsername(username);
      if (!user) {
        throw new UserNotFoundError(
          `User with username ${username} not found.`
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async handleListUsers(
    userFromTokenDTO: UserFromTokenDTO
  ): Promise<UserApplicationDTO[]> {
    // Create a transaction
    const transaction = await Database.getInstance().database.transaction();

    try {
      // Perform authorization check
      if (userFromTokenDTO.role !== 1) {
        throw new Error('Unauthorized');
      }

      // Call UserDAO function to get the data
      const users = await UserDAO.getInstance(
        Database.getInstance().database
      ).getAllApplications();

      // Pack the data into a DTO
      const userListDTOs: UserApplicationDTO[] = users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
      }));

      // Commit the transaction
      await transaction.commit();

      // Return the DTOs to the API layer
      return userListDTOs;
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  }
}
