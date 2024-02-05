import {Dialect, Sequelize} from 'sequelize';

class Database {
  database: Sequelize;

  constructor() {
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
   * Creates non-existing tables, existing tables are not touched.
   *
   * @throws Throws an exception if the database could not be created.
   */
  async createTables() {
    try {
      await this.database.authenticate();
      await this.database.sync({force: false});
    } catch (error) {
      console.error('Error connecting or syncing database:', error);
      throw new Error('Connection to the database failed!');
    }
  }
}
export default Database;
