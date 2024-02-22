import {checkSchema} from 'express-validator';
import {createUserService} from '../service/user_service_factory';
import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {ResponseHandler} from './response_handler';
import {Request, Response, Router} from 'express';
import Authorization from './authorization';
import {UserLoginDTO} from '../model/dto/user_login_dto';
import {
  handleExpressValidatorErrors,
  userLoginValidator,
  userRegistrationValidationSchema,
} from './validation_helper';
import {UserAuthDTO} from '../model/dto/user_auth_dto';

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
      checkSchema(userRegistrationValidationSchema),
      async (req: Request, res: Response) => {
        handleExpressValidatorErrors(req);
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
      checkSchema(userLoginValidator),
      async (req: Request, res: Response) => {
        handleExpressValidatorErrors(req);
        const userService = createUserService();
        const loginData = this.loginDataPacker(req.body);
        const user = await userService.handleLogin(loginData);
        if (!user) {
          this.responseHandler.sendHttpResponse(
            res,
            401,
            [{message: 'Login failed', userRole: -1}],
            true
          );
          return;
        }
        Authorization.sendAuthCookie(user, res);
        this.responseHandler.sendHttpResponse(
          res,
          200,
          [
            {
              message: 'Login successful',
              userRole: user.role,
            },
          ],
          false
        );
      }
    );

    this.router.get('/', async (req: Request, res: Response) => {
      const data = 'user API is up!';
      const httpStatusCode = 200;
      this.responseHandler.sendHttpResponse(res, httpStatusCode, data, false);
      return;
    });

    this.router.get('/all', async (req: Request, res: Response) => {
      const decodedToken = Authorization.getUserAuth(req);
      const {userId, roleId} = decodedToken;
      const userAuthDTO: UserAuthDTO = {
        userId: decodedToken.userId,
        roleId: decodedToken.roleId,
      };
      const result = await createUserService().handleListUsers(userAuthDTO);
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

export {UserApi};
