import {userRegistrationData} from '../utilities/data_interfaces';
import {ConflictError} from '../utilities/custom_errors';

export class UserService {
  constructor() {}
  handleRegistration(data: userRegistrationData) {
    console.log('registration handler called with data:');
    console.log(data);
    throw new ConflictError('There is conflicting data in the system');
    //biz logic goes here
  }
}
