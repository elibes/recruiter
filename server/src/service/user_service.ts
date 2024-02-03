import {userRegistrationData} from "../utilities/data_interfaces";

export class UserService {
  constructor () {
  }
  handleRegistration(data : userRegistrationData) {
    console.log("registration handler called with data:")
    console.log(data)
    //biz logic goes here
  }
}

