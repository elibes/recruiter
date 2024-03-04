import {Dialect, Sequelize} from 'sequelize';
import {User} from '../model/user';
import {Competence} from '../model/competence';
import {CompetenceProfile} from '../model/competence_profile';
import {Availability} from '../model/availability';
import * as cls from 'cls-hooked';
import {Translation} from '../model/translation';
import {Language} from '../model/language';
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
   * Creates new instance using .env variables and defines a cls namespace to allow declarative transaction handling.
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
      logging: false,
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
      Translation.createModel(this.database);
      Language.createModel(this.database);

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

      Competence.hasMany(Translation, {
        foreignKey: 'competence_id',
        as: 'competenceInTranslation',
      });
      Translation.belongsTo(Competence, {
        foreignKey: 'competence_id',
        as: 'competenceInTranslation',
      });

      Language.hasMany(Translation, {
        foreignKey: 'language_id',
        as: 'languageInTranslation',
      });
      Translation.belongsTo(Language, {
        foreignKey: 'language_id',
        as: 'languageInTranslation',
      });
    } catch (error) {
      throw new Error('Error setting up database models:');
    }
  }
}

export {Database};
