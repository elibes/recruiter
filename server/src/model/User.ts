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
  role!: any;

  //readonly createdAt!: Date;
  //readonly updatedAt!: Date;
  //readonly deletedAt!: Date;

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
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'person_id'
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'name'
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'surname'
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'email'
        },
        personalIdentificationNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'pnr'
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'username'
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'password'
        },
        /*
        loggedInUntil: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: 0,
        },
        */
        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
          //defaultValue: false,
          field: 'role_id'
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

export default User;
