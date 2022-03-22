const Sequelize = require('sequelize')
const db = require('./db.js')
const sequelizeInstance = new Sequelize(db.database, db.user, db.password, {
    logging: function(sql){
        console.log(sql)
    },
    host: db.host,
    port: db.port,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    dialect: db.dialect,
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    timezone: '+08:00'
})

module.exports = sequelizeInstance;