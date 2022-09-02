const PromiseRepository = require("../repositories/promise.repository");

class PromiseService {
    constructor() {
        this.promiseRepository = new PromiseRepository();
    }

    createPromise = async (title, date, x, y, penalty, userId) => {
        const promise_id = abcgit 
        try{
           
                const response = await this.findFriend(friendlist)
            } catch (err) {}
        

        const result = await this.promiseRepository.createPromise(
            promise_id,
            title,
            date,
            x,
            y,            
            penalty,
            userId,
            );
        

        await this.createParticipants(abc, friendlist)
    };
        
    createParticipants = async (friendlist) => {        
        
            await this.promiseRepository.createParticipants(response)
        
        } 

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
        
        const result = await this.promiseRepository.findFriend(phone);
        return result

    }    

    deletePromise = async (userId, promiseId) => {

        const response = await this.checkPromiseExists(promiseId);
        this.checkPromiseCreator(response, userId);

        const isDeleted = await this.promiseRepository.deletePromise(userId, promiseId);

        return (isDeleted);
    };   

    checkPromiseCreator(response,userId) {
        if(response.userId !== userId) {
            const error = new Error("UNAUTHORIZED_USER");
            error.code = 401;
            throw error;
        };
    };

    async checkPromiseExists(promiseId) {

        const response = await this.promiseRepository.getPromiseDetail(promiseId);
        if (response.promiseId === null){
            const error = new Error("약속이 존재하지 않습니다");
            error.code = 404;
            throw error
        } else return response;

    };
};

module.exports = PromiseService;