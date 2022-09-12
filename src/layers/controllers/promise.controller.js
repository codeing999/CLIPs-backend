const PromiseService = require('../services/promise.service');
const joi = require('joi');
const promise = require('../../sequelize/models/promise');

class PromiseController {

    constructor() {
        this.promiseService = new PromiseService();
    }

    createPromise = async (req, res) => {
        const { title, date, x, y, friendlist, penalty } = req.body;
        const user_id = res.locals.userId;        

        try {
            await joi.object({
                title: joi.string().required(),
                date: joi.date().required(),
                x: joi.number().required(), // 어떻게 넘겨주는지 다시 체크 필요
                y: joi.number().required(),
                penalty: joi.string(),
                user_id: joi.number().required()
            })
                .validateAsync({ title, date, x, y, penalty, user_id })
            await this.promiseService.createPromise(title, date, x, y, penalty, user_id);

            return res.status(200).send("약속 생성 완료")
        } catch (err) {
            // console.log(err)
            return res.status(400).send(err);
        }

        // try {
        //     await joi.object({
        //         friendlist: joi.array(),
        //     })
        //         .validateAsync({ friendlist })

        //     await this.promiseService.createParticipants(friendlist)

        //     return res.status(200).send("약속이 등록되었습니다");
        // } catch (err) {
        //     return res.status(400).send(err);
        // }

    };


findFriend = async (req, res) => {
    const { phone } = req.body;

    try {
        await joi.object({
            phone: joi.string()
        })
            .validateAsync({ phone })

        const result = await this.promiseService.findFriend(phone)
        return res.status(200).send(result);
    } catch (err) {
        return res.status(400).send(err);
    }
};

getAllPromise = async (req, res) => {

    try {
        const result = await this.promiseService.getAllPromise();

        return res.status(200).json(result)
    } catch (err) {

        return res.status(400).json(err.message)
    }
};

getPromiseDetail = async (req, res) => {
    const {promiseId} = req.params;
    
    try{
        await joi.object({
            promiseId: joi.number().required()
        })
        .validateAsync({promiseId});
    } catch (err) {
        return res.status(400).json("일단 실패")
    }

    try {
        const result = await this.promiseService.getPromiseDetail(promiseId);
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

    deletePromise = async (req,res) => {
        const user_id = res.locals.userId;
        const {promiseId} = req.params;

        try {
            await joi.object({
                user_id: joi.number().required(),
                promiseId: joi.number().required()
            })
            .validateAsync({ user_id, promiseId });
        } catch (err) {
            return res.status(400)
        }
        try {
            const result = await this.promiseService.deletePromise(user_id, promiseId);
            return res.status(200).json("약속이 삭제되었습니다");

        } catch (err) {
            return res.json(err.message, err.code);
        }

    };

};

module.exports = PromiseController;