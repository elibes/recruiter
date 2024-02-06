import {DataTypes, Model, Sequelize} from 'sequelize';
import UserDTO from '../service/UserDTO';

/**
 * A user of the recruiter website.
 * */
class User extends Model {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  personalIdentificationNumber!: string;
  username!: string;
  passwordHash!: string;
  loggedInUntil!: Date;
  isRecrtuiter!: boolean;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt!: Date;

  /**
   * The name of the model.
   * @return a string containing the name.
   * */
  static get USER_MODEL_NAME() {
    return 'user';
  }

  /**
   * Creates a user model.
   * @param sequelize The sequalize object.
   * @return A sequalize model representing a user.
   * */
  static createModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        personalIdentificationNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        loggedInUntil: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: 0,
        },
        isRecruiter: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: User.USER_MODEL_NAME,
        timestamps: true,
        paranoid: true,
      }
    );

    return User;
  }
}

export default User;
