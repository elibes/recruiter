import {DataTypes, Model, Sequelize} from 'sequelize';

/**
 * Represents a Translation model with properties to hold translation details
 * and a static method to initialize the model with a Sequelize instance.
 */
class Translation extends Model {
  declare id: number;
  declare competenceId: number;
  declare languageId: number;
  declare name: string;

  /**
   * Initializes the Translation model and defines its schema and table configuration.
   * @param {Sequelize} sequelize - The Sequelize instance to use for model initialization.
   * @returns {typeof Translation} - The initialized Translation model.
   */
  static createModel(sequelize: Sequelize) {
    Translation.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'translation_id',
        },
        competenceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'competence_id',
          references: {
            model: 'competence',
            key: 'competence_id',
          },
        },
        languageId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'language_id',
          references: {
            model: 'language',
            key: 'language_id',
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'name',
        },
      },
      {
        sequelize,
        modelName: 'translation',
        tableName: 'translation',
        timestamps: false,
      }
    );
    return Translation;
  }
}

export {Translation};
