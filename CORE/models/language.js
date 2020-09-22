'use strict';
module.exports = (sequelize, DataTypes) => {
    const language = sequelize.define('language', {
        name: DataTypes.STRING
    }, {});
    language.associate = function(models) {
        language.hasMany(models.menu);
        language.hasMany(models.menuItem);
    };
    return language;
};