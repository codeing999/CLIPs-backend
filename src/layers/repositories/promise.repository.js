const {User, Promise, Friend} = require("../../sequelize/models");
const sequelize = require("sequelize");

class PromiseRepository {

    createPromise = async (title, date, x, y,  penalty, user_id) => {
        try{
            await Promise.create({
                title,
                date,
                x,
                y,
                penalty,
                user_id
            });
        } catch (err) {
            const error = new Error("FAILD_SQL");
            error.code = 405;
            throw error
        };
    };

    createParticipants = async (friendlist) => {

        try {
            await Friend.create({
                friendlist
            });
        } catch (err) {
            const error = new Error("FAILD_SQL");
            error.code = 405;
            throw error
        }
    };

    getAllPromise = async () => {
        try {
            const response = await Promise.findAll({
                order: [['date', 'DESC']],
                attributes: { exclude: ['penalty','done']}
            });
            
            return response;
        } catch (err) {
            const error = new Error("FAILD_SQL");
            error.code = 405;
            throw error
        }
    };

    getPromiseDetail = async (promiseId) => {
        
        try{
            const response = await Promise.findOne({
                where: {promiseId : promiseId},
            });

            return response.dataValues;
        } catch (err) {
            const error = new Error("FAILD_SQL");
            error.code = 405;
            throw error
        }
    };

    findFriend = async (phone) => {
        try {
            const response = await User.findOne({
                attributes: ['phone', 'name'],
                where : {phone: phone},
            });
            return response;
        } catch (err) {
            const error = new Error("FAILD_SQL");
            error.code = 405;
            throw error
        }
    };

    deletePromise = async (user_id, promiseId) => {
        try {
            return await Promise.destroy({
                where: {promise_id : promiseId}
            })
        } catch(err) {
            const error = new Error("FAILD_SQL_DEL");
            error.code = 405;
            throw error
        };
    };

};


module.exports = PromiseRepository