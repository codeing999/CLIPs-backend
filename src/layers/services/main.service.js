const MainRepository = require("../repositories/main.repository");
const request = require("request");
const axios = require("axios");
const { query } = require("express");
// const {
//   ConfigurationServicePlaceholders,
// } = require("aws-sdk/lib/config_service_placeholders");

module.exports = class MainService {
  mainRepository = new MainRepository();

  getAddress = async (location) => {

    //카카오 로컬에서 x,y 값 반환
    try {
        const addressResponse = await axios({
          method: "get",
          url: "https://dapi.kakao.com/v2/local/search/address.json?radius=200", //address,keyword, 등으로 바꾸기 가능
          params: { query: `${location}`}, //body값
          headers: {
            Authorization: "KakaoAK 001eef018cff25d1b840b7e1044c7da5",
          }, //https://dapi.kakao.com/v2/local/search/address.json?query=강남구 삼성동
        }); 
        const responseAdressData= addressResponse.data.documents.map((p) => {
            return {
                x: p.x, 
                y: p.y,
                city: p.address_name, //address겠지만..
                gu: p.region_2depth_name, //왜 안되누..
            };})
            
        return responseAdressData;
      } catch (err) {
        console.log(err);
        return false;
      }
  }

  getImage = async (keyword) => {

    //카카오 로컬에서 place_url(추후에 imageUrl 크롤링 위한) 반환
    try {
        const imageResponse = await axios({
          method: "get",
          url: "https://dapi.kakao.com/v2/local/search/keyword.json?radius=200", //address,keyword, 등으로 바꾸기 가능
          params: { query: `${keyword}`}, //body값
          headers: {
            Authorization: "KakaoAK 001eef018cff25d1b840b7e1044c7da5",
          }, //https://dapi.kakao.com/v2/local/search/address.json?query=강남구 삼성동
        });

        const responseImageData= imageResponse.data.documents.map((p) => {
            return {
                x: p.x, 
                y: p.y,
                place:p.place_name,
                address:p.road_address_name,
                category: p.category_name,
                place_url: p.place_url, //왜 안되누..
            };})
            
            
        return responseImageData;
      } catch (err) {
        console.log(err);
        return false;
      }
  }

};
