import {checkSchema, validationResult} from 'express-validator';
import {baseSanitizationSchema} from '../utilities/validators';
import {createUserService} from '../service/user_service_factory';
import {userRegistrationData} from '../utilities/data_interfaces';

class UserApi {
  constructor(
    private responseHandler: any,
    private errorHandler: any,
    private router: any
  ) {}

  async setupRequestHandling() {
    this.router.post(
      '/register',
      checkSchema(validationSchemaPost),
      this.errorHandler.asyncErrorWrapper(async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log('errors');
          const httpStatusCode = 400;
          const data = {errors: errors.array()};
          this.responseHandler.sendHttpResponse(
            res,
            httpStatusCode,
            data,
            false
          );
          return;
        }
        const userService = createUserService();
        const registrationData = this.registrationDataPacker(req.body);
        userService.handleRegistration(registrationData);
        const data = {message: 'register API is up!'};
        const httpStatusCode = 200;
        this.responseHandler.sendHttpResponse(res, httpStatusCode, data, false);
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

  registrationDataPacker(body: any) {
    const data: userRegistrationData = {
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
      personalNumber: body.personalNumber,
      email: body.email,
    };
    return data;
  }
}

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
    isNumeric: {
      errorMessage: 'Personal number must be a number',
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
