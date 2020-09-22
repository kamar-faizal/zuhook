'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('languages', [{
            "id": 1,
            "name": "English"
        }, {
            "id": 2,
            "name": "Tamil"
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('languages', null, {});
    }
};