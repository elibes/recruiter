import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {UserDTO} from '../model/dto/user_dto';
import {CookieOptions} from 'express';
import validator from 'validator';
import {CustomValidationError} from '../utilities/custom_errors';
import {UserAuthDTO} from '../model/dto/user_auth_dto';
interface CustomJwtPayload extends jwt.JwtPayload {
  roleId: string;
}
/**
 * Provides authorization functionalities such as sending authentication cookies, unpacking and verifying them.
 */
class Authorization {
  /**
   * Name of the authentication cookie.
   * @static
   * @returns {string} The name of the cookie used for authentication.
   */
  static get AUTH_COOKIE_NAME() {
    return 'recruiterAuth';
  }

  /**
   * Sends an authentication cookie with a JWT containing user information.
   * @static
   * @param {UserDTO} user - The user data to encode in the JWT.
   * @param {Response} res - The response on which to set the cookie.
   */
  static sendAuthCookie(user: UserDTO, res: Response) {
    const jwtSecret = process.env.JWT_SECRET;
    if (typeof jwtSecret !== 'string') {
      throw new Error('JWT_SECRET is not defined');
    }

    const payload: CustomJwtPayload = {
      sub: user.id.toString(),
      roleId: user.role.toString(),
    };

    const jwtToken = jwt.sign(payload, jwtSecret); //30 min in seconds

    const nodeEnv = process.env.NODE_ENV;
    if (typeof nodeEnv !== 'string') {
      throw new Error('nodeEnv is not defined');
    }
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: nodeEnv === 'production',
    };
    res.cookie(Authorization.AUTH_COOKIE_NAME, jwtToken, cookieOptions);
  }

  /**
   * This middleware function takes a request that includes a valid JWT user token and tries to verify it.
   * If successful it returns the userId and roleId, otherwise it will throw an error.
   * @param req a request containing a validated JWT token.
   */
  static getUserAuth(req: Request): UserAuthDTO {
    const authCookieName = this.AUTH_COOKIE_NAME;
    const authCookie = req.cookies[authCookieName];
    const jwtSecret = process.env.JWT_SECRET;
    if (typeof jwtSecret !== 'string') {
      throw new Error('JWT_SECRET is not defined');
    }
    const payload = jwt.verify(authCookie, jwtSecret) as CustomJwtPayload;
    if (
      payload.sub &&
      payload.roleId &&
      validator.isInt(payload.sub) &&
      validator.isInt(payload.roleId)
    ) {
      return {
        userId: validator.toInt(payload.sub),
        roleId: validator.toInt(payload.roleId),
      };
    } else {
      throw new CustomValidationError('auth payload is invalid');
    }
  }
}

export default Authorization;
