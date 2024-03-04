# recruiter-iv1201
This is a Client-side-rendered application built for Amusement Park that will be used for a recruitment process of new staff.

## Key functionality
#### User Roles and Registration:
* Supports two types of users: regular applicants and recruiters.
* Users can register an account, automatically becoming an applicant.
* To become a recruiter, the role_id of a user's account must be manually edited in the database (from 2 to 1).

#### User Interface Based on Role:
* Upon login, applicants are directed to a submission page to apply, while recruiters are directed to view all applications stored in the database.
* Rather than apply to a specific position, applicants can apply to all positions by simply inputing their availability period(s), competence (ies) and years of experience in the submission page.
* Recruiters can then view these submission after login.
* Restrictions prevent applicants from accessing the recruiter page and vice versa. The role of the user is stored in the client-side application state to enforce page access permissions.
* A JSON Web Token (JWT) containing the user's role is used for server communication to ensure authorized access.

#### Security Features:
* Passwords are encrypted by the server before storage in the database.
* Implements CORS configuration for secure server-client communication, allowing specified HTTP requests.
* Server allows GET and POST requests from specified origin.
* The server's cookie options for JWT require same-site set to 'none' and secure set to 'true', facilitating cross-origin requests securely.

#### Data Validation and Localization:
* Basic client-side validation includes checks for necessary field completion and password match during account registration.
* Advanced validation such as password strength and email format is performed server-side and communicated back to the client.
* Supports localization for English and Swedish, with language detection based on the browser's language or manually set by user preference. 

#### Compatibility:
* Tested and compatible with major web browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari.

## Architectural overview:

The application is split into a front-end responsible for the UI, and a backend responsible for everything else.

#### Front-end layers:

* **View** - Containing the interfaces that the user interact with.
* **ViewModel** - The brain of the front-end. Handling user input from the view layer and providing it with data from the model layer. 
* **Model** - The data source, responsible for getting data from the back-end.
* **Router** - Handles the concerns of navigation and flow control.
* **Util** - For cross-cutting concerns, like error handling.

#### Back-end layers:

* **Api** - Responsible for functionality related to directly interacting with the outside and managing the HTTP request-response cycle.
* **Service** - The brain of the application, Handling buinsess logic and decision making. Also handles data flow between api and integration.
* **Integration** - Abstracts the logic required to access the database.
* **Model** - Contains definitions of domain model objects.
* **Utilities** - For cross-cutting concerns, like error handling and validation.

## Technologies used

The application is split into a front-end and a back-end api both of which uses Typescript and Node.js.

### Shared technologies:
* **npm** - Used to install, manage and share project dependencies.
* **ESLint, Prettier, Google typescript styleguide** - A combination of tools to enforce code quality and consistency.
* **nodemon** - A utility that automatically restarts node.js when changes are detected in the source files.
* **date-fns** - A library for handling date and time manipulation.
* **dotenv-safe** - A tool to load enviroment variables, to ensure sensitive configuration is omitted from version control.

### Back-end technologies:
* **Express (and various middleware)** - The core web framework for building the API.
* **Sequelize** - An ORM to simplify interaction with the database.
* **PostgresSQL** - The DBMS used for the database.
* **Brcypt** - Hashes and salts passwords for secure storage.
* **validator.js** - A library containing various string validators.
* **decimal.js** - A library to add a decimal type to javascript.

### Front-end technologies:
* **React (via create react app)** - A library for building interactive UI.
* **Redux (redux-toolkit)** - For state management
* **i18next** - A framework to aide in internationalization of web pages.
* **Fetch API** - To communicate with the back-end server.

## Building
The application is separated into two parts: the server application, and the client application. The two parts are built and launched separately.
Note that both the server and client requires environment variables. When running locally, you can copy the values from the `.env.example` file to a `.env` file in the same directory. If your database is configured differently than specified in the `.env.example` for the server you will need to make changes accordingly in the `.env` file.
### Server

#### Development build
A development build will reload when changes in the code are dected, but will not be as optimized as a production build.
1. Navigate to the `server` directory from the root of the project.
2. Run `npm install` to install all dependecies specified in `package.json`.
3. Run `npm run dev` to start the server.

#### Production build
A production build has better optimization than a development build, and can be run locally to verify that the application works before deploying.
1. Navigate to the `server` directory from the root of the project.
2. Run `npm install` to install all dependecies specified in `package.json`.
3. Run `npm run build` to create an optimized production build in the `build` directory.
4. Run `npm start` to run the build from stored in `build`.

### Client
#### Development build
A development build will reload when changes in the code are dected, but will not be as optimized as a production build.
1. Navigate to the `client` directory from the root of the project.
2. Run `npm install` to install all dependecies specified in `package.json`.
3. Run `npm start` to start the client.

#### Production build
A production build has better optimization than a development build, and can be run locally to verify that the application works before deploying.
0. Make sure you have a static server installed, such as `serve` (`npm install -g serve`)
1. Navigate to the `client` directory from the root of the project.
2. Run `npm install` to install all dependecies specified in `package.json`.
3. Run `npm run build` to create an optimized production build in the `build` directory.
4. Start the client by running the build stored in `build` (with `serve`, run `serve -s build`).

## Deploying
This will show how to set up a deployment using [render](https://render.com/).

### Database
0. Make sure you have psql installed on your system.
1. Follow [this guide](https://docs.render.com/databases#create-your-database) up to when you create the database.
2. Click the "Connect" button (top right of the screen), select the "External connection" tab, and copy the PSQL command.
3. Open your terminal and paste the command to connect to the database remotely.
4. Run `\i [path to database dump]` to restore your dump of the database on your render database.
5. Disconnect from the database with `\q`.

### Server
Follow [this guide](https://docs.render.com/web-services#deploy-from-github--gitlab) to set up a *web service* for hosting the server.
Note the following:
* When choosing a repository select this one.
* Select the `main` branch when asked.
* Select Node.js as the runtime.
* Write `server` as the root directory.
* Write `npm install` as the build script.
* Write `npm start` as the start script.

You will then need to specify the following environment variables:
* `CORS_URL`: Write the URL of the client.
* `DB_DIALECT`: Write `postgres`.
* `DB_HOST`: Copy and paste the "Hostname" from **Info > Connection** for your render database.
* `DB_NAME`: Copy and paste the "Database" from **Info > Connection** for your render database.
* `DB_PASSWORD`: Copy and paste the "Password" from **Info > Connection** for your render database.
* `DB_PORT`: Copy and paste the "Port" from **Info > Connection** for your render database.
* `DB_USER`: Copy and paste the "Username" from **Info > Connection** for your render database.
* `JWT_SECRET`: Press "Generate" to create a random string, or specify your own.

You can now click **Manual Deploy > deploy latest commit** to deploy the server.

### Client
Follow [this guide](https://docs.render.com/deploy-create-react-app) to set up a *static website* for hosting the client application.
Note the following:
* Select the `main` branch when asked.
* Write `client` as the root directory.
* For the build command, write `npm install; npm run build`.
* For the publish directory, write `./build`.
* Make sure to follow the "Using Client-Side Routing" part of the guide.

You will then need to specify the following environment variable:
* `REACT_APP_SERVER_URL`: Write the URL of the server.

You can now click **Manual Deploy > deploy latest commit** to deploy the server.

### Automatically deploy client and server with CI/CD

Copy the deploy hooks from **Setting > Build & Deploy** of the server and client on render and paste into **Settings > Secrets and variable > Actions > New Repository Secret** and store as separate SECRETS for client and server on GitHub.

### Database Setup
This project includes additional SQL scripts to create and populate the "translation" and "language" tables, which are crucial for the application's localization features. The database_script.sql file located at the root of the project contains the SQL commands needed to create the language and translation tables, along with the initial data for these tables. To run this script:
* Ensure you have a PostgreSQL database set up and accessible.
* Open a terminal or command prompt.
* Navigate to the root directory of the project where the database_script.sql file is located.
* Run the script by executing the following command, replacing [your_database_name] with the name of your database:
`psql -d [your_database_name] -f database_script.sql`.
