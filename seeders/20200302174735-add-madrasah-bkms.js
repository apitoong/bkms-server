"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert(
      "Madrasahs",
      [{
        nama: "BKMS",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Madrasahs", {
        nama: "BKMS"
      }, {}
    );
  }
};