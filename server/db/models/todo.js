'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Todo.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      task: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );
  return Todo;
};
