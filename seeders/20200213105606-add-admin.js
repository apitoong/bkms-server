"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { hashPassword } = require("../helpers/bycrypt");
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "info@apitoong.com",
          pass: hashPassword("123456"),
          role: "super",
          organisasi: "bkms",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Users",
      { email: "info@apitoong.com" },
      {}
    );
  }
};
