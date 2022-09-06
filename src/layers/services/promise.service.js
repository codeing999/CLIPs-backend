const PromiseRepository = require("../repositories/promise.repository");

class PromiseService {
    constructor() {
        this.promiseRepository = new PromiseRepository();
    }

    createPromise = async (title, date, x, y, penalty, userId, friendlist) => {
        // try {
        let phone = ''
        for (let i = 0; i <= friendlist.length - 1; i++) {
            phone = friendlist[i].phone

            const user = await this.findFriend(phone)
        }

        let randomId = performance.now().toString(36) + Math.random().toString(36).substring(2)
        const promiseId = randomId.split(".")[1]

        const result = await this.promiseRepository.createPromise(
            promiseId,
            title,
            date,
            x,
            y,
            penalty,
            userId,
        );

        let user = ''
        for (let i = 0; i <= friendlist.length - 1; i++) {
            phone = friendlist[i].phone
            let friend = await this.findFriend(phone)
            user = friend.dataValues.userId
            console.log(friend.dataValues.userId)
            const createdFriend = await this.createParticipants(promiseId, user)
        }

        return result;
    };

    createParticipants = async (promiseId, user) => {

        await this.promiseRepository.createParticipants(promiseId, user)

    }

    getAllPromise = async () => {
        const response = await this.promiseRepository.getAllPromise();
        return response;
    }

    getPromiseDetail = async (promiseId) => {

        const response = await this.promiseRepository.getPromiseDetail(promiseId);
        return response;
    }

    findFriend = async (phone) => {

        const result = await this.promiseRepository.findFriend(phone);
        return result

    }

    deletePromise = async (userId, promiseId) => {

        const response = await this.checkPromiseExists(promiseId);
        this.checkPromiseCreator(response, userId);

        const isDeleted = await this.promiseRepository.deletePromise(userId, promiseId);

        return (isDeleted);
    };

    checkPromiseCreator(response, userId) {
        if (response.userId !== userId) {
            const error = new Error("UNAUTHORIZED_USER");
            error.code = 401;
            throw error;
        };
    };

    async checkPromiseExists(promiseId) {

        const response = await this.promiseRepository.getPromiseDetail(promiseId);
        if (response.promiseId === null) {
            const error = new Error("약속이 존재하지 않습니다");
            error.code = 404;
            throw error
        } else return response;

    };
};

module.exports = PromiseService;