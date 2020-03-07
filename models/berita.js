'use strict';
module.exports = (sequelize, DataTypes) => {
  const Berita = sequelize.define('Berita', {
    title: DataTypes.STRING,
    time: DataTypes.STRING,
    description: DataTypes.TEXT,
    gambar_id: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id: DataTypes.STRING,
    posting: DataTypes.STRING,
    madrasah_id: DataTypes.STRING
  }, {});
  Berita.associate = function (models) {
    // associations can be defined here
    Berita.belongsTo(models.Gambar, {
      foreignKey: "gambar_id",
      as: "gambar"
      // constraints: false
    });


    Berita.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Berita.belongsTo(models.Madrasah, {
      foreignKey: "madrasah_id",
      as: "madrasah"
      // constraints: false
    });

  };
  return Berita;
};