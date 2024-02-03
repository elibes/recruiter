import * as express from 'express';

import * as path from 'path';

const SERVER_ROOT_DIR_PATH = path.join(__dirname, '..');

import * as dotenv from 'dotenv-safe';
dotenv.config({
  path: path.join(SERVER_ROOT_DIR_PATH, '.env'),
  example: path.join(SERVER_ROOT_DIR_PATH, '.env.example'),
});

const app: any = express();

import {ApiManager} from './api/api_manager';

const apiManager = ApiManager.getInstance(app);
apiManager.loadAllApi();

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
