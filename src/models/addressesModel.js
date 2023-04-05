const { ADDRESSES_TABLE } = require('../const/tableNames');

module.exports = (sequelize, type) => {
  return sequelize.define(ADDRESSES_TABLE, {
    apartament: {
      type: type.STRING,
    },
    city: {
      allowNull: false,
      type: type.STRING,
    },
    country: {
      allowNull: false,
      type: type.STRING,
    },
    id:{
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    street_name: {
      allowNull: false,
      type: type.STRING,
    },
    street_number: {
      allowNull: false,
      type: type.INTEGER,
    },
    zip_code: {
      allowNull: false,
      type: type.INTEGER,
    },
  },
  {
    paranoid: true,
  });
}