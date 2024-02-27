import {DataTypes, Model, Sequelize} from 'sequelize';

class Language extends Model {
  declare id: number;
  declare name: string

  static createModel(sequelize: Sequelize) {
    Language.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'language_id',
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'name'
        }
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
