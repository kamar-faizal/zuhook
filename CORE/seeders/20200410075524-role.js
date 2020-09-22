'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [{
                "id": 1,
                "name": "Administrator",
                "description": "Full Access, Read, Write Permissions."
            },
            {
                "id": 2,
                "name": "User",
                "description": "View All, Buy Our Products, Register Our Courses, Apply Job in Carrers."
            },
            {
                "id": 3,
                "name": "Guest",
                "description": "Anonymous Users."
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
};