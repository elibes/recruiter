/**
 * @fileoverview This is the startup / main file for the server, it does some basic setup of dotenv,
 * the express app and the database
 * It also configures and starts some global middleware, which will be used in handling all incoming request.
 *
 * Note that the order of app.use() calls will affect the order the middleware are used,
 * so moving these statements can have unintended consequences.
 */

import * as express from 'express';

import * as path from 'path';

import { config } from 'dotenv-safe';

import * as cors from 'cors';

import * as cookieParser from 'cookie-parser';

import {Database} from './integration/database';

import {ApiManager} from './api/api_manager';

require('express-async-errors');

const SERVER_ROOT_DIR_PATH = path.join(__dirname, '..');

config();

const app = express();

// final error fallback
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  // eslint-disable-next-line
  process.exit(1);
});
const db = Database.getInstance();
try {
  db.connectToDatabase().then(() => {
    console.log('Database connected!');
  });
  db.setupDatabaseModels().then(() => {
    console.log('Database models created!');
  });
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

const apiManager = ApiManager.getInstance(app);
apiManager.createAllApis();

let port: number;
if (process.env.PORT === undefined) {
  port = 3001;
} else {
  port = +process.env.PORT;
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export {db};
