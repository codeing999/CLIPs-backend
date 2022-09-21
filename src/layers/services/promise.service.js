const PromiseRepository = require("../repositories/promise.repository");

class PromiseService {

  promiseRepository = new PromiseRepository();


  createPromise = async (title, date, location, x, y, penalty, userId, friendList) => {
    try {
      await this.findFriend(friendList);
      const promiseId = this.generateRandomId();

      const result = await this.promiseRepository.createPromise(
        promiseId,
        title,
        date,
        location,
        x,
        y,
        penalty,
        userId
      );

      await this.createParticipants(friendList, promiseId);
      return result;
    } catch (err) {
      console.log(err)
      throw err
    }
  };

  getAllPromise = async (userId) => {
    const response = await this.promiseRepository.getAllPromise(userId);

    return response.map((Promise) => {
      Promise.dataValues.countFriend = Promise.participants.length;
      Promise.dataValues.friendList = Promise.participants;

      delete Promise.dataValues.participants;
      for (let i = 0; i <= Promise.dataValues.friendList.length - 1; i++) {
        delete Promise.dataValues.friendList[i].dataValues.Friend
      }; // Friend 객체 지우기 (레포에서 직접 제외시키지 못해 수동으로 지움)
    
      return Promise;
    });
  };

  getPromiseDetail = async (promiseId, userId) => {
    await this.checkPromiseExists(promiseId);
    const response = await this.promiseRepository.getPromiseDetail(promiseId);
    const username = await this.promiseRepository.findUser(userId);

    for (let i = 0; i <= response.participants.length - 1; i++) {
      delete response.participants[i].dataValues.Friend
    };

    const result = {
      title: response.title,
      userId: response.userId,
      username: username.dataValues.name,
      date: response.date,
      location: response.location,
      x: response.x,
      y: response.y,
      friendList: response.participants,
      countFriend: response.participants.length,
      penalty: response.penalty,
      done: response.done,
    }

    return result;

  };

  updatePromise = async (title, date, x, y, penalty, userId, friendList, promiseId) => {
    try {
      const response = await this.checkPromiseExists(promiseId);
      this.checkPromiseCreator(response, userId);

      await this.findFriend(friendList);

      const changePromise = await this.quizRepository.updatePromise(
        promiseId,
        title,
        date,
        x,
        y,
        penalty,
      );

      await this.createParticipants(friendList, promiseId);
      return result;
    } catch (err) {
      throw err
    }
  };

  deletePromise = async (userId, promiseId) => {
    const response = await this.checkPromiseExists(promiseId);
    this.checkPromiseCreator(response, userId);

    const isDeleted = await this.promiseRepository.deletePromise(
      userId,
      promiseId
    );

    return isDeleted;
  };

  findFriend = async (friendList) => {
    let nickname = "";
    let user = "";
    for (let i = 0; i <= friendList.length - 1; i++) {
      nickname = friendList[i].nickname;
      user = await this.promiseRepository.findFriend(nickname);
      if (user === null) {
        const error = new Error("찾으시는 친구가 존재하지 않습니다.");
        error.code = 404;
        throw error;
      }
    } return user;
  };

  generateRandomId() {
    let randomId = performance.now().toString(36) +
      Math.random().toString(36).substring(2);
    const promiseId = randomId.split(".")[1];
    return promiseId;
  }

  async createParticipants(friendList, promiseId) {
    let user = "";
    let nickname = "";
    for (let i = 0; i <= friendList.length - 1; i++) {
      nickname = friendList[i].nickname;
      let friend = await this.promiseRepository.findFriend(nickname);
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
  };
};

module.exports = PromiseService;