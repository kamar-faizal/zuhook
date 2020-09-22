'use strict';
const bcrypt = require("bcrypt");
module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
                "firstName": "karthikeyan",
                "lastName": "ramalingam",
                "email": "srkarthi1982@gmail.com",
                "password": await bcrypt.hash("Sriram@12345", 10),
                "mobile": "0509649595",
                "roleId": 1
            },
            {
                "firstName": "kamar",
                "lastName": "fizal",
                "email": "faizalnasse@gmail.com",
                "password": await bcrypt.hash("Kamar@123", 10),
                "mobile": "0555615148",
                "roleId": 2
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};