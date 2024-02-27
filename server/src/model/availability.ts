import {DataTypes, Model, Sequelize} from 'sequelize';
import {Validators} from '../utilities/validators';

/**
 * A specification of a time period a particular applicant are available to work.
 */
class Availability extends Model {
  declare id: number;
  declare personId: number;
  declare fromDate: Date;
  declare toDate: Date;

  /**
   * Creates a availability model.
   * @param sequelize The Sequelize object.
   * @return A Sequelize model representing a availability.
   * */
  static createModel(sequelize: Sequelize) {
    Availability.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'availability_id',
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
        fromDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'from_date',
        },
        toDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'to_date',
        },
      },
      {
        sequelize,
        modelName: 'availability',
        tableName: 'availability',
        timestamps: false,
        validate: {
          fn() {
            if (
              !Validators.availabilityPeriodValidator(
                this.fromDate as string,
                this.toDate as string
              )
            ) {
              throw new Error(
                'Availability period validation failed at integration layer'
              );
            }
          },
        },
      }
    );
    return Availability;
  }
}

export {Availability};
