import {checkSchema, validationResult} from 'express-validator';
import {baseSanitizationSchema} from '../utilities/validators';
import {createUserService} from '../service/user_service_factory';
import {userRegistrationData} from '../utilities/data_interfaces';
import {ValidationSanitizationError} from '../utilities/custom_errors';

/**
 * This class represents the api logic used for user related requests.
 */
class UserApi {
  /**
   * Dependencies needed for api operation are injected via this constructor.
   * @param responseHandler a handler used for formatting and sending HTTP responses.
   * @param errorHandler a handler used for enabling error handling.
   * @param router the express route associated with this class.
   */
  constructor(
    private responseHandler: any,
    private errorHandler: any,
    private router: any
  ) {}

  /**
   * This function sets up the handling used for each operation or action defined for this route
   * , it will be called only once, by the api manager.
   */
  async setupRequestHandling() {
    this.router.post(
      '/register',
      checkSchema(validationSchemaPost),
      this.errorHandler.asyncErrorWrapper(async (req: any, res: any) => {
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
        const data = await userService.handleRegistration(registrationData);
        this.responseHandler.sendHttpResponse(res, 200, data, false);
        return;
      })
    );

    this.errorHandler.asyncErrorWrapper(
      this.router.get('/', (req: any, res: any) => {
        const data = {message: 'user API is up!'};
        const httpStatusCode = 200;
        this.responseHandler.sendHttpResponse(res, httpStatusCode, data, false);
      })
    );
  }

  /**
   * This helper function packs the data after validation and sanitization into a defined interface object to be sent
   * to the service layer.
   * @param body
   */
  registrationDataPacker(body: any) {
    const data: userRegistrationData = {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.userName,
      password: body.password,
      personalNumber: body.personalNumber,
      email: body.email,
    };
    return data;
  }
}

/**
 * This object represents the validation and sanitization schema for the registration POST operation.
 * It is used with the checkSchema function defined in the express validation package.
 */
const validationSchemaPost: any = {
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
    toInt: true,
    notEmpty: {
      errorMessage: 'Personal number is required',
    },
    isLength: {
      options: {
        min: 12,
        max: 12,
      },
      errorMessage: 'Personal number must be 12 digits',
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

export {UserApi};
