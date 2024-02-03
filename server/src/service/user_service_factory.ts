
import {UserService} from './user_service';
function createUserService() {
  return new UserService();
}

export {createUserService};
