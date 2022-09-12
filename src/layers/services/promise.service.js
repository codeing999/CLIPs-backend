const PromiseRepository = require("../repositories/promise.repository");

class PromiseService {
    constructor() {
        this.promiseRepository = new PromiseRepository();
    }

    createPromise = async (title, date, x, y, penalty, user_id) => {
        await this.promiseRepository.createPromise(
            title,
            date,
            x,
            y,            
            penalty,
            user_id,
        );
        return '약속 생성';
    };

    createParticipants = async (friendlist) => {        

        await this.promiseRepository.createParticipants(
            friendlist
        );
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
        await this.promiseRepository.findFriend(phone);
        return "친구 찾기 완료"
    }

    deletePromise = async (user_id, promiseId) => {

        // const response = await this.checkPromiseExists(promiseId);
        // this.checkPromiseOwner(response, user_id);

        const isDeleted = await this.promiseRepository.deletePromise(user_id, promiseId);

        return (isDeleted);
    }

    async checkPromiseExists(promiseId) {

        const response = await this.promiseRepository.getPromiseDetail(promiseId);
    }

};

module.exports = PromiseService;