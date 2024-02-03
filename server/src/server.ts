import * as express from 'express';

import * as path from 'path';

import * as dotenv from 'dotenv-safe';

import * as cors from 'cors';

import * as cookieParser from 'cookie-parser';

import {ErrorHandler} from './api/error_handler';

const SERVER_ROOT_DIR_PATH = path.join(__dirname, '..');

dotenv.config({
  path: path.join(SERVER_ROOT_DIR_PATH, '.env'),
  example: path.join(SERVER_ROOT_DIR_PATH, '.env.example'),
});

const app: any = express();

import {ApiManager} from './api/api_manager';

const apiManager = ApiManager.getInstance(app);
apiManager.defineRoutes();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost', //placeholder
    methods: ['GET', 'POST', 'PUT', 'DELETE'], //REST methods
    credentials: true, //for auth cookies
  })
);

apiManager.createAllApis();

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
