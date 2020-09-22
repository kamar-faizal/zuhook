'use strict';
module.exports = (sequelize, DataTypes) => {
    const profile = sequelize.define('profile', {
        mobile: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true,
                min: 10
            }
        },
        address: DataTypes.TEXT,
        photo: DataTypes.STRING
    }, {});
    profile.associate = function(models) {
        profile.belongsTo(models.user);
    };
    return profile;
};