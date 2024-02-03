import {ResponseHandler} from './response_handler';
import {checkSchema, validationResult} from 'express-validator';
import {baseSanitizationSchema} from "../utilities/validators";
import * as express from 'express';
class UserApi {
  constructor(
    private responseHandler: ResponseHandler,
    private router: any
  ) {}

  async setupRequestHandling() {
    this.router.post('/register', checkSchema(validationSchemaPost), (req: any, res: any) =>
    {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("errors");
        const httpStatusCode = 400;
        const data = { errors: errors.array() };
        this.responseHandler.sendHttpResponse(res, httpStatusCode, data);
        return;
      }
      const data = {message: 'register API is up!'};
      const httpStatusCode = 200;
      this.responseHandler.sendHttpResponse(res, httpStatusCode, data);
      return;
    }
    );


    this.router.get('/', (req: any, res: any) => {
      const data = {message: 'user API is up!'};
      const httpStatusCode = 200;
      this.responseHandler.sendHttpResponse(res, httpStatusCode, data);
    });
  }
}

const validationSchemaPost:any = {
  firstName : {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'First name is required',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'First name must be at least 1 characters',
    }
  },

  lastName : {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Last name is required',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'Last name must be at least 1 characters',
    }
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
      options: { min: 1 },
      errorMessage: 'Username must be at least 1 characters',
    }
  },

  password: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be stronger',
    },
  },

  personalNumber: {
    ...baseSanitizationSchema,
    notEmpty: {
      errorMessage: 'Personal number is required'
    },
    isNumeric: {
      errorMessage: 'Personal number must be a number'
    },
    isLength: {
      options: {
        min: 12, max: 12
      },
      errorMessage: 'Personal number must be 12 digits'
    }
  },

  email: {
    ...baseSanitizationSchema,
    isEmail: {
      errorMessage: 'Invalid email',
    },
    normalizeEmail: true
  }
}

export {UserApi};
