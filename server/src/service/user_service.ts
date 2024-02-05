import {userRegistrationData} from '../utilities/data_interfaces';
import {ConflictError} from '../utilities/custom_errors';
import {Database} from '../integration/Database';
import {UserDAO} from '../integration/UserDAO';
import {AuthenticationService} from './authentication_service';

/**
 * This class implements the logic for handling user related operations.
 */
export class UserService {
  constructor() {}

  /**
   * This function handles the register user operation.
   * @param data the validated and sanitized registration data passed through the presentation layer.
   */
  async handleRegistration(data: userRegistrationData) {
    const db = Database.getInstance().database;
    const dataRollbackState = {...data};

    const transaction = await db.transaction();

    try {
      const userDAO = UserDAO.getInstance(db);
      const result = await userDAO.findUserByUsername(data.username);
      if (result !== null) {
        throw new ConflictError('That username already exists');
      }
      data.password = await AuthenticationService.hashPassword(data.password);
      await userDAO.createUser(data);
      await transaction.commit();
      return 'Registration successful!';
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
