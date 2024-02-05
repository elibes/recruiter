import {userRegistrationData} from '../utilities/data_interfaces';
import {ConflictError} from '../utilities/custom_errors';

/**
 * This class implements the logic for handling user related operations.
 */
export class UserService {
  constructor() {}

  /**
   * This function handles the register user operation.
   * @param data the validated and sanitized registration data passed through the presentation layer.
   */
  handleRegistration(data: userRegistrationData) {
    console.log('registration handler called with data:');
    console.log(data);


    //throw new ConflictError('There is conflicting data in the system');
    //biz logic goes here
  }
}
