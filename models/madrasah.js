'use strict';
module.exports = (sequelize, DataTypes) => {
  const Madrasah = sequelize.define('Madrasah', {
    nama: DataTypes.STRING
  }, {});
  Madrasah.associate = function (models) {
    // associations can be defined here


    Madrasah.hasMany(models.User, {
      foreignKey: 'organisasi',
      as: 'users',
    });
    Madrasah.hasMany(models.Berita, {
      foreignKey: "madrasah_id",
      as: "beritas",
      constraints: false
    });
  };
  return Madrasah;
};