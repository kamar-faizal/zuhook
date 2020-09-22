'use strict';
module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {});
    role.associate = function(models) {
        role.hasMany(models.user);
    };
    return role;
};