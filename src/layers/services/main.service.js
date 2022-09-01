const MainRepository = require("../repositories/main.repository");
const request = require("request");
const axios = require("axios");
const { query } = require("express");

//크롤링
const { Builder, By, Key, until } = require("selenium-webdriver");

// const {
//   ConfigurationServicePlaceholders,
// } = require("aws-sdk/lib/config_service_placeholders");

module.exports = class MainService {
  mainRepository = new MainRepository();

//카테고리 랜덤으로 반환하여 place_url(추후에 imageUrl 크롤링 위한) 추출
getImage = async (location) => {
  //구까지 받은 location을 x,y 좌표로 변환하기
    try {
      const addressResponse = await axios({
        method: "get",
        url: "https://dapi.kakao.com/v2/local/search/address.json?radius=200",
        params: { query: `${location}` }, //body값
        headers: {
          Authorization: "KakaoAK 001eef018cff25d1b840b7e1044c7da5"},
      });
      const responseAdressData = addressResponse.data.documents.map((p) => {
        return {
          x: p.x,
          y: p.y,
          address_gu: p.address_name, 
        };
      });

      console.log(`${location}의 좌표는`, responseAdressData[0].y,responseAdressData[0].x)

      const keywordlist = ["대형마트", "편의점", "어린이집, 유치원", '학교', "주차장", "주유소, 충전소", "지하철역", "은행", "문화시설", "중개업소", "공공기관", "관광명소", "숙박", "음식점", "카페", "병원", "약국"]
      const randomNumber = Math.floor(Math.random()*keywordlist.length);
      
      //받은 구 내 랜덤 카테고리 추천
      try{
      const imageResponse = await axios({
        method: "get",
        url: "https://dapi.kakao.com/v2/local/search/keyword.json?radius=2000", 
        params: { query: `${keywordlist[randomNumber]}`, y:`${responseAdressData[0].y}`, x:`${responseAdressData[0].x}` }, 
        headers: {
          Authorization: "KakaoAK 001eef018cff25d1b840b7e1044c7da5",
        }, //https://dapi.kakao.com/v2/local/search/address.json?radius=200&query=카테고리
      });

      // if (imageResponse.data.meta.total_count === 0) {
      //   return res.send({message:`${location}의 ${keywordlist[randomNumber]}가 존재하지 않습니다. 재검색해보세요`})
      // } {
      const responseImageData = imageResponse.data.documents.map((p) => {
        return {
          x: p.x,
          y: p.y,
          place: p.place_name,
          address: p.road_address_name,
          category: p.category_name,
          place_url: p.place_url,
        };
      })

      console.log(`${location}의 ${keywordlist[randomNumber]}는 ${imageResponse.data.meta.total_count} 개.\n 자세한 내용(랜덤 1개)`, responseImageData[Math.floor(Math.random() * responseImageData.length)])
    } 
    
    catch(err) {console.log(err)
      return false}

      // for (let i = 0; i < responseImageData.length; i++) {
      //   let crawlingData = responseImageData[i].place_url;
        
      //   console.log("크롤링 시작", crawlingData)

      //   const crawlingDataUrl = async function example() {
      //     // (async function example() {
      //       let driver = await new Builder().forBrowser("chrome").build();
            
      //       try {
      //         await driver.get(crawlingData); 
      //         // Javascript를 실행하여 UserAgent를 확인한다. -> 왠지 모름
      //         let userAgent = await driver.executeScript(
      //           "return navigator.userAgent;"
      //         );
      //         //  let selector = "#mArticle > div.cont_photo > div.photo_area > ul > li"
      //         let resultElements = await driver.findElement(
      //           By.className("#mArticle > div.cont_photo > div.photo_area > ul > li")
      //         );
      //         console.log("크롤링 중간", resultElements);

      //         // 검색 결과의 text를 가져와서 콘솔에 출력한다.
      //         console.log("크롤링 끝");
      //         for (var i = 0; i < resultElements.length; i++) {
      //           console.log((await resultElements[i].getText()));
      //         }
      //     }
      //     finally{
      //         driver.quit();
      //     }
      // }();
    
        // };
        return responseAdressData;
      return responseImageData;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};
