import {checkSchema, validationResult} from 'express-validator';
import {baseSanitizationSchema} from '../utilities/validators';
import {createUserService} from '../service/user_service_factory';
import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {ValidationSanitizationError} from '../utilities/custom_errors';
import {ResponseHandler} from './response_handler';
import {Request, Response, Router} from 'express';
import Authorization from './Authorization';
import {UserLoginDTO} from '../model/dto/user_login_dto';
import {UserFromTokenDTO} from '../model/dto/user_from_token_dto';
import * as jwt from 'jsonwebtoken';

/**
 * This class represents the api logic used for user related requests.
 */
class UserApi {
  /**
   * Dependencies needed for api operation are injected via this constructor.
   * @param responseHandler a handler used for formatting and sending HTTP responses.
   * @param router the express route associated with this class.
   */
  constructor(
    private responseHandler: ResponseHandler,
    private router: Router
  ) {}

  /**
   * This function sets up the handling used for each operation or action defined for this route.
   * it should only be called once, by the api manager.
   */
  async setupRequestHandling() {
    this.router.post(
      '/register',
      checkSchema(validationSchemaRegistrationPost),
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new ValidationSanitizationError(
            errors
              .array()
              .map(err => err.msg)
              .join(', ')
          );
        }
        const userService = createUserService();
        const registrationData = this.registrationDataPacker(req.body);
        const state = await userService.handleRegistration(registrationData);
        if (state) {
          const data = 'Registration successful';
          this.responseHandler.sendHttpResponse(res, 200, data, false);
        } else {
          console.log(
            'handleRegistration did not return true without throwing an error'
          );
          throw new Error('server error');
        }
        return;
      }
    );

    this.router.post(
      '/login',
      checkSchema(validationSchemaLoginPost),
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new ValidationSanitizationError(
            errors
              .array()
              .map(err => err.msg)
              .join(', ')
          );
        }
        const userService = createUserService();
        const loginData = this.loginDataPacker(req.body);
        const user = await userService.handleLogin(loginData);
        if (!user) {
          this.responseHandler.sendHttpResponse(res, 401, 'Login failed', true);
          return;
        }
        Authorization.sendAuthCookie(user, res);
        this.responseHandler.sendHttpResponse(
          res,
          200,
          'Login successful',
          false
        );
        return;
      }
    );

    this.router.get('/', async (req: Request, res: Response) => {
      const data = 'user API is up!';
      const httpStatusCode = 200;
      this.responseHandler.sendHttpResponse(res, httpStatusCode, data, false);
      return;
    });

    this.router.get('/all', async (req: Request, res: Response) => {
      // Extract the JWT token from the request
      // TODO: this needs to be refactored into a middleware after merge
      const token = req.headers.authorization;

      if (!token || !process.env.JWT_SECRET) {
        throw new Error('Authorization token or secret key is missing');
      }

      // Decode the token and extract the user info
      // TODO: this needs to be refactored based on a middleware from another branch
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof decodedToken === 'string') {
        throw new Error('Invalid token');
      }
      const {id, role} = decodedToken;

      // Pack the user info into a UserFromTokenDTO
      const userFromTokenDTO: UserFromTokenDTO = {
        id,
        role,
      };

      // Send the DTO to the service layer function
      const result =
        await createUserService().handleListUsers(userFromTokenDTO);

      // Send the result back to the client
      this.responseHandler.sendHttpResponse(res, 200, result, false);
      return;
    });
  }

  /**
   * This helper function packs the data after validation and sanitization into a defined interface object to be sent
   * to the service layer.
   * @param body
   */
  registrationDataPacker(body: any) {
    const data: UserRegistrationDTO = {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.userName,
      password: body.password,
      personalNumber: body.personalNumber,
      email: body.email,
    };
    return data;
  }

  /**
   * This helper function packs the data after validation and sanitization into a defined interface object to be sent
   * to the service layer.
   * @param body
   */
  loginDataPacker(body: any) {
    const data: UserLoginDTO = {
      username: body.userName,
      password: body.password,
    };
    return data;
  }
}

/**
 * This object represents the validation and sanitization schema for the registration POST operation.
 * It is used with the checkSchema function defined in the express validation package.
 */
const validationSchemaRegistrationPost: any = {
  firstName: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'First name is required',
    },
    isLength: {
      options: {min: 1},
      errorMessage: 'First name must be at least 1 characters',
    },
  },

  lastName: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Last name is required',
    },
    isLength: {
      options: {min: 1},
      errorMessage: 'Last name must be at least 1 characters',
    },
  },

  userName: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Username is required',
    },
    isAlphanumeric: {
      errorMessage: 'Username must be alphanumeric',
    },
    isLength: {
      options: {min: 1},
      errorMessage: 'Username must be at least 1 characters',
    },
  },

  password: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: {
      options: {min: 6},
      errorMessage: 'Password must be stronger',
    },
  },

  personalNumber: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Personal number is required',
    },
    isLength: {
      options: {
        min: 13,
        max: 13,
      },
      errorMessage: 'Personal number must be 13 digits',
    },
  },

  email: {
    ...baseSanitizationSchema,
    isEmail: {
      errorMessage: 'Invalid email',
    },
    normalizeEmail: true,
  },
};

/**
 * This object represents the validation and sanitization schema for the login POST operation.
 * It is used with the checkSchema function defined in the express validation package.
 */
const validationSchemaLoginPost: any = {
  userName: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Username is required',
    },
    isAlphanumeric: {
      errorMessage: 'Username must be alphanumeric',
    },
    isLength: {
      options: {min: 1},
      errorMessage: 'Username must be at least 1 characters',
    },
  },

  password: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: {
      options: {min: 6},
      errorMessage: 'Password must be stronger',
    },
  },
};

export {UserApi};
