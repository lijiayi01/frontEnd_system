const UserModel = require('../model/User')
const moment = require('moment')
class UserServices{
    constructor(){

    }

    async getAll(req, res){
        try {
            const con = await UserModel.findAll()
            res.json({
                retCode: '0',
                data: con
            })
        } catch (error) {
            res.json({
                retCode: '1000',
                msg: 'mysql error' 
            })
        }
        
    }

    async add(req, res){
        const { user_login_id, user_id } = req.body;
        console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        console.log(Date.now())
        try {
            const con = await UserModel.create({
                user_login_id,
                user_id,
                user_login_ip: 0
            })
            console.log(con.toJSON())
        } catch (error) {
            console.log(error)
        }
    }

    async update(req, res){
        try {
            let con = await UserModel.update({
                user_login_ip: 123
            }, {
                where: {
                    user_id: 3
                }
            })

            res.json({
                retCode: '0'
            })
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req, res){
        console.log('delete')
        try {
            let con = await UserModel.destroy({
                where: {
                    user_id: 3
                }
            })
            res.json({
                retCode: '0'
            })
        } catch (error) {
            console.log(error)
        }
    }

    
}

const instance = new UserServices()

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

module.exports = instance;