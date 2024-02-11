import {Dialect, Sequelize} from 'sequelize';
import {User} from '../model/user';
import {Competence} from "../model/competence";
import {CompetenceProfile} from "../model/competence_profile";

/**
 * The class responsible for creating the connection to the database.
 * Is used before retrieving data from the database.
 * */
class Database {
  private static instance: Database;
  public database: Sequelize;

  /**
   * Gets a singleton instance of the Database class.
   * @return {Database} A singleton instance of the class.
   * */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Creates new instance using .env variables.
   * */
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
   * Attempts to connect to the database.
   * @throws {Error} When failing to authenticate the database connection.
   * @async
   */
  async connectToDatabase() {
    try {
      await this.database.authenticate();
    } catch (error) {
      throw new Error('Error connecting/authenticating database');
    }
  }

  /**
   * Creates all sequelize objects representing tables in the database.
   * @throws {Error} When setting up a model fails
   * @async
   * */
  async setupDatabaseModels() {
    try {
      User.createModel(this.database);
      Competence.createModel(this.database);
      CompetenceProfile.createModel(this.database);


    } catch (error) {
      throw new Error('Error setting up database models:');
    }
  }
}

export {Database};
