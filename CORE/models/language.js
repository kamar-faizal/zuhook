'use strict';
module.exports = (sequelize, DataTypes) => {
    const language = sequelize.define('language', {
        name: DataTypes.STRING
    }, {});
    language.associate = function(models) {};
    return language;
};