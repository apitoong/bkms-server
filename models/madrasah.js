'use strict';
module.exports = (sequelize, DataTypes) => {
  const Madrasah = sequelize.define('Madrasah', {
    nama: DataTypes.STRING
  }, {});
  Madrasah.associate = function(models) {
    // associations can be defined here
    Madrasah.belongsToMany(models.Berita, {
      through: "BeritaMadrasah",
      as: "beritas",
      foreignKey: "madrasah_id",
      otherKey: "berita_id"
    });
    
    Madrasah.hasMany(models.User, {
      foreignKey: 'organisasi',
      as: 'users',
    });
  };
  return Madrasah;
};