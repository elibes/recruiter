import {DataTypes, Model, Sequelize} from 'sequelize';

/**
 * Represents a Language model with properties for language details
 * and a static method to initialize the model with a Sequelize instance.
 */
class Language extends Model {
  declare id: number;
  declare code: string;

  /**
   * Initializes the Language model and defines its schema and table configuration.
   * @param {Sequelize} sequelize - The Sequelize instance to use for model initialization.
   * @returns {typeof Language} - The initialized Language model.
   */
  static createModel(sequelize: Sequelize) {
    Language.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'language_id',
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'code',
        },
      },
      {
        sequelize,
        modelName: 'language',
        tableName: 'language',
        timestamps: false,
      }
    );
    return Language;
  }
}

export {Language};
