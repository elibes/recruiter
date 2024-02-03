import {UserService} from './user_service';

/**
 * This factory function creates instance of the userService class. Each operation a new instance shall be created to
 * ensure reliable operation in concurrent conditions.
 */
function createUserService() {
  return new UserService();
}

export {createUserService};
