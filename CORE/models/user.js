'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.TEXT
        },
        mobile: {
            type: DataTypes.TEXT
        },
        roleId: DataTypes.INTEGER
    }, {});
    user.associate = function(models) {
        user.hasOne(models.profile);
        user.belongsTo(models.role);
    };
    return user;
};