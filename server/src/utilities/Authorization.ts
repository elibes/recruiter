import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserDTO } from "../model/dto/user_dto";
import {UserService} from "../service/user_service";
import {createUserService} from "../service/user_service_factory";

interface JwtPayloadWithUsername extends jwt.JwtPayload {
  username?: string;
}

interface CustomRequest extends Request {
  user?: UserDTO;
}
class Authorization {
  static get AUTH_COOKIE_NAME() {
    return 'recruiterAuth';
  }

  static sendAuthCookie(user: UserDTO, res: Response) {
    const notAccessibleFromJs = { httpOnly: true };

    const jwtSecret = process.env.JWT_SECRET;
    if (typeof jwtSecret !== 'string') {
      throw new Error('JWT_SECRET is not defined');
    }

    const jwtToken = jwt.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: '30 minutes' },
    );

    const cookieOptions = { ...notAccessibleFromJs };
    res.cookie(Authorization.AUTH_COOKIE_NAME, jwtToken, cookieOptions);
  }

  static async checkLogin(userService:UserService, req: CustomRequest, res: Response) {
    const authCookie = req.cookies.AUTH_COOKIE_NAME;
    const jwtSecret = process.env.JWT_SECRET;
    if (typeof jwtSecret !== 'string') {
      throw new Error('JWT_SECRET is not defined');
    }
    if(!authCookie) {
      // TODO: better error handling (...errorHandler)
      return false;
    }
    try {
      const userJWTPayload = jwt.verify(authCookie, jwtSecret) as JwtPayloadWithUsername;
      if (!userJWTPayload.username || typeof userJWTPayload.username !== 'string') {
        throw new Error('Invalid JWT payload: username not found or not a string');
      }
      const userService = createUserService();
      const loggedInUser = await userService.isLoggedIn(userJWTPayload.username);
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
}

export default Authorization;
