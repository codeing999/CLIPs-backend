const {User, Promise} = require("../../sequelize/models/user");
const sequelize = require("sequelize");

class PromiseRepository {

    createPromise = async (title, date, location, friendlist, penalty) => {
        try{
            await User.create({
                title,
                date,
                location,
                friendlist,
                penalty
            });
        } catch (err) {
            const error = new Error("FAILD_SQL");
            error.code = 405;
            throw error
        };
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

};


module.exports = PromiseRepository