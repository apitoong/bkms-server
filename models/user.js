'use strict';
module.exports = (sequelize, DataTypes) => {
  const { hashPassword } = require('../helpers/crypto')
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'hasrus mengandung "@"'
        }, 
        isunique(value) {
          
          return User.findOne({
              where: {
                email: value
              }
            })
            .then(function (data) {
              if (data !== null) {
                throw new Error('email sudah exist')
              }
            })
            .catch(err => {
              throw new Error(err)
            })
        }
      }
    },
    pass: DataTypes.STRING,
    role: DataTypes.STRING,
    organisasi: DataTypes.STRING,
  },  {
    hooks: {
      beforeValidate(User) {
        console.log('masokkkk hokkkk',User.pass);
        if(User.pass.length>20){

        }else{

          User.pass = hashPassword(User.pass)
        }
      },
      
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Berita, {
      foreignKey: 'user_id',
      as: 'beritas',
    });

    User.belongsTo(models.Madrasah, {
      foreignKey: "organisasi",
      as: "madrasah",
      constraints: false
    });
  };
  return User;
};