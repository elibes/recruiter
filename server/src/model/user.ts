import {DataTypes, Model, Sequelize} from 'sequelize';
import {Validators} from '../utilities/validators';

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
          validate: {
            fn: async (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.nameValidator(value)
              ) {
                throw new Error('email validation failed on db insert');
              }
            },
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'surname',
          validate: {
            fn: async (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.nameValidator(value)
              ) {
                throw new Error('email validation failed on db insert');
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'email',
          validate: {
            fn: async (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.emailValidator(value)
              ) {
                throw new Error('email validation failed on db insert');
              }
            },
          },
        },
        personalIdentificationNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'pnr',
          validate: {
            fn: async (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.personalNumberValidator(value)
              ) {
                throw new Error('email validation failed on db insert');
              }
            },
          },
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'username',
          validate: {
            fn: async (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.userNameValidator(value)
              ) {
                throw new Error('username validation failed on db insert');
              }
            },
          },
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'password',
          validate: {
            fn: async (value: any) => {
              if (!Validators.defaultValidator(value)) {
                throw new Error('password validation failed on db insert');
              }
            },
          },
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
