import {DataTypes, Model, Sequelize} from 'sequelize';


class Availability extends Model {
  declare id: number;
  declare personId: number;
  declare from_date: Date;
  declare to_date: Date;

  /**
   * Creates a competence model.
   * @param sequelize The Sequelize object.
   * @return A Sequelize model representing a competence.
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
          type: DataTypes.STRING,
          allowNull: false,
          field: 'person_id',
          references : {
            model: 'user',
            key: 'person_id'
          }
        },
        from_date: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'name',
        },
        to_date: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'name',
        },
      },
      {
        sequelize,
        modelName: 'competence',
        tableName: 'competence',
        timestamps: false,
      }
    );
    return Availability;
  }
}

export {Availability};
