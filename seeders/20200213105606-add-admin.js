"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      hashPassword
    } = require("../helpers/crypto");
    return queryInterface.bulkInsert(
      "Users",
      [{
        email: "info@apitoong.com",
        pass: hashPassword("bkms2020baru"),
        role: "super",
        organisasi: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Users", {
        email: "info@apitoong.com"
      }, {}
    );
  }
};