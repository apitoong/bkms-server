'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gambar = sequelize.define('Gambar', {
    path: DataTypes.STRING,
    status: DataTypes.STRING,
    berita_id: DataTypes.STRING
  }, {});
  Gambar.associate = function(models) {
    // associations can be defined here
  };
  return Gambar;
};