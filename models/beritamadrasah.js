'use strict';
module.exports = (sequelize, DataTypes) => {
  const BeritaMadrasah = sequelize.define('BeritaMadrasah', {
    berita_id: DataTypes.STRING,
    madrasah_id: DataTypes.STRING
  }, {});
  BeritaMadrasah.associate = function (models) {
    // associations can be defined here

  };
  return BeritaMadrasah;
};