'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    static associate(models) {
      Income.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Income.init({
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};