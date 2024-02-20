import {ApplicationService} from './application_service';

/**
 * This factory function creates instance of the userService class. Each request a new instance shall be created to
 * ensure reliable operation in concurrent conditions.
 */
function createApplicationService() {
  return new ApplicationService();
}

export {createApplicationService};
