import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {UserDTO} from '../model/dto/user_dto';
import {UserService} from '../service/user_service';
import {createUserService} from '../service/user_service_factory';
import {CookieOptions} from 'express';
import validator from 'validator';
import {CustomValidationError} from '../utilities/custom_errors';
import {UserAuthDTO} from '../model/dto/user_auth_dto';

/**
 * Extends the JwtPayload to include a username.
 * @interface
 */
interface JwtPayloadWithUsername extends jwt.JwtPayload {
  username?: string;
}

interface CustomJwtPayload extends jwt.JwtPayload {
  roleId: string;
}

/**
 * Extends the Request to include a user property.
 * @interface
 */
interface CustomRequest extends Request {
  user?: UserDTO;
}

/**
 * Provides authorization functionalities such as sending authentication cookies and checking login status.
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

    const jwtToken = jwt.sign(payload, jwtSecret, {expiresIn: '30 minutes'});

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
   * Checks the login status of the user by validating the authentication cookie.
   * @static
   * @param {UserService} userService - The user service to use for checking if a user is logged in.
   * @param {CustomRequest} req - The request from which to extract the authentication cookie.
   * @param {Response} res - The response to clear the cookie if authentication fails.
   * @returns {Promise<boolean>} True if the user is authenticated, false otherwise.
   * @async
   */
  /*
  static async checkLogin(
    userService: UserService,
    req: CustomRequest,
    res: Response
  ) {
    const authCookie = req.cookies.AUTH_COOKIE_NAME;
    const jwtSecret = process.env.JWT_SECRET;
    if (typeof jwtSecret !== 'string') {
      throw new Error('JWT_SECRET is not defined');
    }
    if (!authCookie) {
      // TODO: better error handling (...errorHandler)
      return false;
    }
    try {
      const userJWTPayload = jwt.verify(
        authCookie,
        jwtSecret
      ) as JwtPayloadWithUsername;
      if (!userJWTPayload.username) {
        throw new Error('Invalid JWT payload: username not found');
      }
      const userService = createUserService();
      const loggedInUser = await userService.isLoggedIn(
        userJWTPayload.username
      );
      if (loggedInUser === null) {
        res.clearCookie(Authorization.AUTH_COOKIE_NAME);
        return false;
      }
      req.user = loggedInUser;
      return true;
    } catch (err) {
      res.clearCookie(Authorization.AUTH_COOKIE_NAME);
      return false;
    }
  }
*/
  static getUserAuth(req: CustomRequest): UserAuthDTO {
    const authCookie = req.cookies.recruiterAuth;
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
