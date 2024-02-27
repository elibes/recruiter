import {DataTypes, Model, Sequelize} from 'sequelize';
import Decimal from 'decimal.js';
import {Validators} from '../utilities/validators';

/**
 * A profile linking an applicant with the competence they have, and they years of experience with that competence.
 * */
class CompetenceProfile extends Model {
  declare id: number;
  declare personId: number;
  declare competenceId: number;
  declare yearsOfExperience: Decimal;

  /**
   * Creates a competence profile model.
   * @param sequelize The Sequelize object.
   * @return A Sequelize model representing a competence profile.
   * */
  static createModel(sequelize: Sequelize) {
    CompetenceProfile.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'competence_profile_id',
        },
        personId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'person_id',
          references: {
            model: 'user',
            key: 'person_id',
          },
          validate: {
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.idValidator(value)
              ) {
                throw new Error(
                  'Person id validation failed at integration layer'
                );
              }
            },
          },
        },
        competenceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'competence_id',
          references: {
            model: 'competence',
            key: 'competence_id',
          },
          validate: {
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.idValidator(value)
              ) {
                throw new Error(
                  'Competence id validation failed at integration layer'
                );
              }
            },
          },
        },
        yearsOfExperience: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: false,
          field: 'years_of_experience',
          validate: {
            fn: (value: any) => {
              if (
                !Validators.defaultValidator(value) ||
                !Validators.yearsOfExperienceValidator(value)
              ) {
                throw new Error(
                  'Years of experience validation failed at integration layer'
                );
              }
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'competenceProfile',
        tableName: 'competence_profile',
        timestamps: false,
      }
    );
    return CompetenceProfile;
  }
}

export {CompetenceProfile};
