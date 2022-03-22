const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const UserModel = sequelize.define('user_login_log', {
    user_login_id: {
        type: Sequelize.DataTypes.INTEGER(10),
        primaryKey: true
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER(10),
    },
    user_login_time: Sequelize.DataTypes.DATE,
    user_login_ip: Sequelize.DataTypes.INTEGER(11)
},{
    freezeTableName: true,
    timestamps: false,
})


module.exports = UserModel;
