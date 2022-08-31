const PromiseRepository = require("../repositories/promise.repository");

class PromiseService {
    constructor() {
        this.promiseRepository = new PromiseRepository();
    }

    createPromise = async (title, date, location, friendlist, penalty) => {

        await this.promiseRepository.createPromise(
            title,
            date,
            location,
            friendlist,
            penalty
        );

        return '약속 생성';
    };

    getAllPromise = async () => {

        const response = await this.promiseRepository.getAllPromise();

    }

    findFriend = async (phone) => {

        await this.promiseRepository.findFriend(
            phone
        );

        return "친구 찾기 완료"
    }


};

module.exports = PromiseService;