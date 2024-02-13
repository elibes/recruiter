import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {ConflictError, LoginPasswordNotMatchError, UserNotFoundError} from '../utilities/custom_errors';
import {Database} from '../integration/database';
import {UserDAO} from '../integration/user_dao';
import {AuthenticationService} from './authentication_service';
import {APPLICANT_ROLE_ID} from '../utilities/configurations';
import {UserLoginDTO} from "../model/dto/user_login_dto";
import {UserDTO} from "../model/dto/user_dto";
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

  async handleLogin(data: UserLoginDTO): Promise<UserDTO> {
    const db = Database.getInstance().database;

    try {
      const userDao = UserDAO.getInstance(db);
      const user = await userDao.findUserByUsername(data.username);
      if(!user) {
        throw new UserNotFoundError(`User with username ${data.username} not found.`);
      }
      const passwordMatch = await bcrypt.compare(data.password, user.passwordHash);
      if(!passwordMatch) {
        throw new LoginPasswordNotMatchError('Password is invalid');
      }
      return user;

    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn(username:string):Promise<UserDTO> {
    const db = Database.getInstance().database;

    try {
      const userDao = UserDAO.getInstance(db);
      const user = await userDao.findUserByUsername(username);
      if(!user) {
        throw new UserNotFoundError(`User with username ${username} not found.`);
      }
      return user;

    } catch (error) {
      throw error;
    }
  }

}
