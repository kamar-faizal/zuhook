'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('profiles', {
            id: {
                allowNull: false,
                references: {
                    model: {
                        tableName: 'users'
                    },
                    key: 'id'
                },
                type: Sequelize.INTEGER
            },
            mobile: {
                type: Sequelize.INTEGER
            },
            address: {
                type: Sequelize.TEXT
            },
            photo: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('profiles');
    }
};