const PromiseRepository = require("../repositories/promise.repository");

class PromiseService {
  constructor() {
    this.promiseRepository = new PromiseRepository();
  }

  createPromise = async (title, date, x, y, penalty, userId, friendList) => {
    try {
      await this.findFriend(friendList);
      const promiseId = this.generateRandomId();

      const result = await this.promiseRepository.createPromise(
        promiseId,
        title,
        date,
        x,
        y,
        penalty,
        userId
      );

      await this.createParticipants(friendList, promiseId);
      return result;
    } catch (err) {
      throw err
    }
  };

  getAllPromise = async () => {
    const response = await this.promiseRepository.getAllPromise();
    return response;
  };

    getPromiseDetail = async (promiseId) => {

        const response = await this.promiseRepository.getPromiseDetail(promiseId);
        return response;
    }

  generateRandomId() {
    let randomId = performance.now().toString(36) +
      Math.random().toString(36).substring(2);
    const promiseId = randomId.split(".")[1];
    return promiseId;
  }

  async createParticipants(friendList, promiseId) {
    let user = "";
    let phone = "";
    for (let i = 0; i <= friendList.length - 1; i++) {
      phone = friendList[i].phone;
      let friend = await this.promiseRepository.findFriend(phone);
      user = friend.dataValues.userId;
      await this.promiseRepository.createParticipants(promiseId, user);
    }
  }

  checkPromiseCreator(response, userId) {
    if (response.userId !== userId) {
      const error = new Error("약속 생성자만 약속을 지울 수 있습니다");
      error.code = 401;
      throw error;
    }
  };

  async checkPromiseExists(promiseId) {
    const response = await this.promiseRepository.getPromiseDetail(promiseId);
    if (response.promiseId === null) {
      const error = new Error("약속이 존재하지 않습니다");
      error.code = 404;
      throw error;
    } else return response;
  }
}

module.exports = PromiseService;