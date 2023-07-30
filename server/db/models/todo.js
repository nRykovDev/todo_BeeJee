'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {}
  }
  Todo.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      task: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );
  return Todo;
};
