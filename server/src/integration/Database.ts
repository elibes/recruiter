import {Dialect, Sequelize} from 'sequelize';
import {User} from '../model/User';

class Database {
  private static instance: Database;
  public database: Sequelize;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private constructor() {
    this.database = new Sequelize({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_Port || '5432'),
      dialect: process.env.DB_DIALECT as Dialect,
    });
  }

  /**
   * @return database Returns the sequelize database object.
   * */
  getTransactionMgr() {
    return this.database;
  }

  /**
   * Attempts to connect to the database.
   */
  async connectToDatabase() {
    try {
      await this.database.authenticate();
      console.log('Database connected!');
    } catch (error) {
      console.error('Error connecting or syncing database:', error);
    }
  }

  async setupDatabaseModels() {
    try {
      User.createModel(this.database);
      console.log('Database models created!');
    } catch (error) {
      console.error('Error setting up database models:', error);
    }
  }

  /**
   * Creates non-existing tables, existing tables are not touched.
   *
   * @throws Throws an exception if the database could not be created.
   */
  /*
  async createTables() {
    try {
      await this.database.authenticate();
      //await this.database.sync({force: false});
    } catch (error) {
      console.error('Error connecting or syncing database:', error);
      throw new Error('Connection to the database failed!');
    }
  }
*/
}

export {Database};
