import {DataTypes, Model, Sequelize} from 'sequelize';

/**
 * A user of the recruiter website.
 * */
class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare personalIdentificationNumber: string;
  declare username: string;
  declare passwordHash: string;
  declare role: number;

  /**
   * The name of the model.
   * @return a string containing the name.
   * */
  static get USER_MODEL_NAME() {
    return 'user';
  }

  /**
   * Creates a user model.
   * @param sequelize The Sequelize object.
   * @return A Sequelize model representing a user.
   * */
  static createModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'person_id',
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'name',
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'surname',
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'email',
        },
        personalIdentificationNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'pnr',
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'username',
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'password',
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'role_id',
        },
      },
      {
        sequelize,
        modelName: User.USER_MODEL_NAME,
        tableName: 'person',
        timestamps: false,
        paranoid: true,
      }
    );

    return User;
  }
}

export {User};
