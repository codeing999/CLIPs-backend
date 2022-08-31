const PromiseService = require('../services/promise.service');
const joi = require('joi');

class PromiseController {
    
    constructor() {
        this.promiseService = new PromiseService();
    }

    createPromise = async (req,res) => {
        const {title, date, x, y, friendlist, penalty} = req.body;
        //const {userId} = res.locals.user;

        try {
            await joi.object({
                title: joi.string().required(),
                date: joi.date().format('YYYY-MM-DD').required(),
                x: joi.number().required(), // 어떻게 넘겨주는지 다시 체크 필요
                y: joi.number().required(),
                friendlist: joi.object(),
                penalty: joi.string(),
            })
                .validateAsync({title, date, location, friendlist, penalty})
            
            const result = await this.promiseService.createPromise(title, date, location, friendlist, penalty)

            return res.status(200).send("약속이 등록되었습니다");
        } catch (err) {
            return res.status(400).send(err);
        }
    };

    findFriend = async (req,res) => {
        const { phone } = req.body;

        try {
            await joi.object({
                phone: joi.string()
            })
            .validateAsync({phone})

            const result = await this.promiseService.findFriend(phone)
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    };

    getAllPromise = async (req,res) => {

        try {
            const result = await this.promiseService.getAllPromise();

            return res.status(200).json(result)
        }   catch (err) {

            return res.status(400).json(err.message)
        }
    };

    getPromiseDetail = async (req,res) => {
        //const {promiseId} = req.params;

        try {
            const result = await this.PromiseService.getPromiseDetail(promiseId);

            return res.status(200).json(result)
        } catch (err) {

            return res.status(400).json(err.message)
        }
    };

    // updatePromise = async (req,res) => {
    //     const {date, x, y, friendList, penalty} = req.body;
    //     const { promiseId } = req.params;

    //     try {
    //         const result = await this.PromiseService.updatePromise();

    //         return res.status(200).send("약속이 수정되었습니다")
    //     }

    // };

    // deletePromise = async (req,res) => {

    // };




};

module.exports = PromiseController;