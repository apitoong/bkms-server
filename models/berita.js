'use strict';
module.exports = (sequelize, DataTypes) => {
  const Berita = sequelize.define('Berita', {
    title: DataTypes.STRING,
    time: DataTypes.STRING,
    description: DataTypes.STRING,
    gambar_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Berita.associate = function(models) {
    // associations can be defined here
  };
  return Berita;
};