import * as validator from 'express-validator';
import * as asser from 'assert';


const baseSanitizationSchema = {
  trim: true,
  escape: true,
  stripLow: true,
}

export {baseSanitizationSchema};


