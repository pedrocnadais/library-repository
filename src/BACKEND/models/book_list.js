'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book_list.init({
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    img: DataTypes.STRING,
    audio: DataTypes.TEXT,
    written: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'book_list',
  });
  return book_list;
};