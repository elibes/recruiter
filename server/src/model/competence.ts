import {DataTypes, Model, Sequelize} from 'sequelize';

/**
 * A named competence representing the name of the competence an applicant may have.
 * */
class Competence extends Model {
  declare id: number;
  declare name: string;

  /**
   * Creates a competence model.
   * @param sequelize The Sequelize object.
   * @return A Sequelize model representing a competence.
   * */
  static createModel(sequelize: Sequelize) {
    Competence.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'competence_id',
        },
        name: {
          type: DataTypes.STRING,
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
    return Competence;
  }
}

export {Competence};
