import {checkSchema, validationResult} from 'express-validator';
import {Validators} from '../utilities/validators';
import {createUserService} from '../service/user_service_factory';
import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {CustomValidationError} from '../utilities/custom_errors';
import {ResponseHandler} from './response_handler';
import {Request, Response, Router} from 'express';
import Authorization from '../utilities/Authorization';
import {UserLoginDTO} from '../model/dto/user_login_dto';

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
      checkSchema(RegistrationValidationSchema),
      async (req: Request, res: Response) => {
        /*
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new ValidationSanitizationError(
            errors
              .array()
              .map(err => {
                if (err.type === 'field') {
                  return err.path + ': ' + err.msg;
                } else {
                  return err.msg;
                }
              })
              .join(', ')
          );
        }
        */
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
      checkSchema(RegistrationValidationSchema),
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new CustomValidationError(
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

const baseUserValidationSchema: any = {
  '*': {
    in: ['body'],
    defaultSanitizer: {
      customSanitizer: Validators.defaultSanitizer,
    },
    defaultValidator: {
      custom: Validators.defaultValidator,
      errorMessage: 'Must not be empty or longer than 255 characters',
    },
  },
};

const sharedRegistrationLoginValidationSchema: any = {
  userName: {
    custom: Validators.userNameValidator,
  },
  password: {
    custom: Validators.passwordValidator,
  },
};

const RegistrationValidationSchema: any = {
  ...baseUserValidationSchema,
  email: {
    emailValidator: {
      custom: Validators.emailValidator,
    },
  },
};

export {UserApi};
