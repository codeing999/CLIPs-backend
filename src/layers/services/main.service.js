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

  getAddress = async (location) => {
    //카카오 로컬에서 x,y 값 반환
    try {
      const addressResponse = await axios({
        method: "get",
        url: "https://dapi.kakao.com/v2/local/search/address.json?radius=200", //address,keyword, 등으로 바꾸기 가능
        params: { query: `${location}` }, //body값
        headers: {
          Authorization: "KakaoAK 001eef018cff25d1b840b7e1044c7da5",
        }, //https://dapi.kakao.com/v2/local/search/address.json?query=강남구 삼성동
      });
      const responseAdressData = addressResponse.data.documents.map((p) => {
        return {
          x: p.x,
          y: p.y,
          city: p.address_name, //address겠지만..
          gu: p.region_2depth_name, //왜 안되누..
        };
      });

      return responseAdressData;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  getImage = async (keyword) => {
    //카카오 로컬에서 place_url(추후에 imageUrl 크롤링 위한) 반환
    try {
      const imageResponse = await axios({
        method: "get",
        url: "https://dapi.kakao.com/v2/local/search/keyword.json?radius=200", //address,keyword, 등으로 바꾸기 가능
        params: { query: `${keyword}` }, //body값
        headers: {
          Authorization: "KakaoAK 001eef018cff25d1b840b7e1044c7da5",
        }, //https://dapi.kakao.com/v2/local/search/address.json?query=강남구 삼성동
      });

      const responseImageData = imageResponse.data.documents.map((p) => {
        return {
          x: p.x,
          y: p.y,
          place: p.place_name,
          address: p.road_address_name,
          category: p.category_name,
          place_url: p.place_url, //왜 안되누..
        };
      });

      // for (let i = 0; i < responseImageData.length; i++) {
        for (let i = 0; i < 1; i++) {
        let crawlingData = responseImageData[0].place_url;
        console.log("크롤링 시작", crawlingData)

        const crawlingDataUrl = async function example() {
          // (async function example() {
            let driver = await new Builder().forBrowser("chrome").build();
            
            try {
              // place_url 열어야함
              await driver.get(crawlingData); 

              // Javascript를 실행하여 UserAgent를 확인한다. -> 왠지 모름
              let userAgent = await driver.executeScript(
                "return navigator.userAgent;"
              );
    
              // css selector로 가져온 element가 위치할때까지 최대 10초간 기다린다.
              await driver.wait(
                until.elementLocated(By.className("list_photo photo_type5")),
                1000
              );
  
              // size_l이라는 클래스 명을 가진 element들을 받아온다.
              let resultElements = await driver.findElements(
                By.className("link_photo")
              );
              console.log(resultElements);

              // 검색 결과의 text를 가져와서 콘솔에 출력한다.
              console.log("== Search results ==");
              for (var i = 0; i < resultElements.length; i++) {
                console.log((await resultElements[i].getText()));
              }
          }
          finally{
              driver.quit();
          }
      }();
    
        };

      return responseImageData;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  //#mArticle > div.cont_photo > div.photo_area > ul > li:nth-child(2)
  // crawlImage = async (req, res) => {
  //     const url = "https://place.map.kakao.com/19514179" //`${원하는 링크}`
  //     try{
  //       await axios({
  //         url:url,
  //         method:"GET",
  //         responseType:"arraybuffer", //html
  //       }).then(async(html)=>{
  //         const content = iconv.decode(html.data, "EUC-KR").toString();
  //         const $ = cheerio.load(content);
  //         const list = $("ul li");

  //         console.log("크롤링 중간", content)

  //         await list.each(async(i, tag)=> {
  //           let firstImage = $(tag).find("nth-child(2)").text()
  //           let secondImage = $(tag).find("nth-child(3)").text()

  //           console.log("크롤링 끝",firstImage,secondImage)
  //         })
  //       });
  //       res.send({result:"success",message:"크롤링 끝"});
  //     } catch(err) {
  //       console.log(err)
  //       res.send({result:"false", message:"크롤링 실패", err:err})
  //     }
  // }
};
