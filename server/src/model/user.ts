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
   * Creates a user model, and sets validator functions to be used per attribute.
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
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.nameValidator(value)
              ) {
                throw new Error(
                  'First name validation failed at integration layer'
                );
              }
            },
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'surname',
          validate: {
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.nameValidator(value)
              ) {
                throw new Error(
                  'Last name validation failed at integration layer'
                );
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'email',
          validate: {
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.emailValidator(value)
              ) {
                throw new Error('Email validation failed at integration layer');
              }
            },
          },
        },
        personalIdentificationNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'pnr',
          validate: {
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.personalNumberValidator(value)
              ) {
                throw new Error(
                  'personalIdentificationNumber validation failed at integration layer'
                );
              }
            },
          },
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'username',
          validate: {
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.userNameValidator(value)
              ) {
                throw new Error(
                  'Username validation failed at integration layer'
                );
              }
            },
          },
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'password',
          validate: {
            fn: (value: any) => {
              if (!Validators.defaultValidator(value)) {
                throw new Error(
                  'Password validation failed at integration layer'
                );
              }
            },
          },
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'role_id',
          validate: {
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.idValidator(value)
              ) {
                throw new Error(
                  'Role id validation failed at integration layer'
                );
              }
            },
          },
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
