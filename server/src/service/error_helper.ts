/**
 * @fileoverview this file contains helper functions that deal with checking for errors in the service layer.
 */

import {ConflictError} from '../utilities/custom_errors';
import {UserDTO} from '../model/dto/user_dto';

export function checkUser(
  userId: number,
  userRole: number,
  userData: UserDTO | null
) {
  if (!userData || userRole !== userData.role) {
    throw new ConflictError(
      'Request user data does not match db data, ' +
        'request had: \nuserId: ' +
        userId +
        '\nwith roleId: ' +
        userRole
    );
  }
}
