import {DataTypes, Model, Sequelize} from 'sequelize';

class Translation extends Model {
  declare id: number;
  declare competenceId: number;
  declare languageId: number;
  declare name: string

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
          }
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'name'
        }
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
