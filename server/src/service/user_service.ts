import {userRegistrationData} from '../utilities/data_interfaces';
import {ConflictError} from '../utilities/custom_errors';
import {Database} from "../integration/Database";
import {UserDAO} from "../integration/UserDAO";

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
    //console.log('registration handler called with data:');
    console.log(data);

    const db = Database.getInstance().database;

    const transaction = await db.transaction();

    try {
      const userDAO = UserDAO.getInstance(db);
      const result = await userDAO.findUserByUsername(data.username);
      if(result !== null) {
        throw new ConflictError('There is conflicting data in the system');
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Transaction failed:', error);
      if(error instanceof ConflictError) {
        throw new ConflictError('There is conflicting data in the system');
      } else {
        throw error
      }
      //restore any modified application state here.
    }
  }
}
