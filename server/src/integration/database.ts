import {Dialect, Sequelize} from 'sequelize';
import {User} from '../model/user';
import {Competence} from '../model/competence';
import {CompetenceProfile} from '../model/competence_profile';
import {Availability} from '../model/availability';
import * as cls from 'cls-hooked';
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

  public getDatabase() {
    return this.database;
  }

  /**
   * Creates new instance using .env variables.
   * */
  private constructor() {
    const namespace = cls.createNamespace('sequelize-namespace');
    Sequelize.useCLS(namespace);
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
   * Creates all sequelize objects representing tables in the database. Also establishes associations between them.
   * @throws {Error} When setting up a model fails
   * @async
   * */
  async setupDatabaseModels() {
    try {
      User.createModel(this.database);
      Competence.createModel(this.database);
      CompetenceProfile.createModel(this.database);
      Availability.createModel(this.database);

      User.hasMany(Availability, {
        foreignKey: 'person_id',
        as: 'personInAvailability',
      });
      Availability.belongsTo(User, {foreignKey: 'person_id'});

      User.hasMany(CompetenceProfile, {
        foreignKey: 'person_id',
        as: 'personInProfile',
      });
      CompetenceProfile.belongsTo(User, {foreignKey: 'person_id'});

      Competence.hasMany(CompetenceProfile, {
        foreignKey: 'competence_id',
        as: 'competence',
      });
      CompetenceProfile.belongsTo(Competence, {foreignKey: 'competence_id'});
    } catch (error) {
      throw new Error('Error setting up database models:');
    }
  }
}

export {Database};
