//import * as validator from 'express-validator';
//import * as asser from 'assert';

/**
 * This object is a custom schema to be used with express validator checkSchema to do basic sanitization.
 * The reason this is here is to reduce code reduplication of these checks.
 */
const baseSanitizationSchema = {
  trim: true,
  escape: true,
  stripLow: true,
};

export {baseSanitizationSchema};
