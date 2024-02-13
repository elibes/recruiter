import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {ConflictError} from '../utilities/custom_errors';
import {Database} from '../integration/database';
import {UserDAO} from '../integration/user_dao';
import {AuthenticationService} from './authentication_service';
import {APPLICANT_ROLE_ID} from '../utilities/configurations';

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
      const userDAO = UserDAO.getInstance();
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
}
