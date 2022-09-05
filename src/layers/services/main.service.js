// const MainRepository = require("../repositories/main.repository");
const request = require("request");
const axios = require("axios");
const { query } = require("express");

//크롤링
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
// const fs = require("fs");

// const {
//   ConfigurationServicePlaceholders,
// } = require("aws-sdk/lib/config_service_placeholders");

module.exports = class MainService {
  // mainRepository = new MainRepository();

  //카테고리 랜덤으로 반환하여 place_url(추후에 imageUrl 크롤링 위한) 추출
  getImage = async (location) => {
    //구까지 받은 location을 x,y 좌표로 변환하기
    let crawlingUrllist = [];

    try {
      const addressResponse = await axios({
        method: "get",
        url: "https://dapi.kakao.com/v2/local/search/address.json?radius=500",
        params: { query: `${location}` }, //body값
        headers: {
          Authorization: "KakaoAK 001eef018cff25d1b840b7e1044c7da5",
          // Authorization: process.env.secretKey,
        },
      });
      const responseAdressData = addressResponse.data.documents.map((p) => {
        return {
          x: p.x,
          y: p.y,
          address_gu: p.address_name,
        };
      });
      //받은 구 내 랜덤 카테고리 추천
      const keywordlist = [
        "대형마트",
        "편의점",
        // "어린이집, 유치원",
        "학교",
        "주차장",
        // "주유소, 충전소",
        "지하철역",
        "은행",
        "문화시설",
        // "중개업소",
        // "공공기관",
        "관광명소",
        "숙박",
        "음식점",
        "카페",
        "병원",
        "약국",
      ];
      const randomNumber = Math.floor(Math.random() * keywordlist.length);
      //랜덤 카테고리별 url 만들기, 나중에 kakaoAK 지우기
      const imageResponse = await axios({
        method: "get",
        url: "https://dapi.kakao.com/v2/local/search/keyword.json?radius=500",
        params: {
          query: `${keywordlist[randomNumber]}`,
          y: `${responseAdressData[0].y}`,
          x: `${responseAdressData[0].x}`,
        },
        headers: {
          Authorization: "KakaoAK 001eef018cff25d1b840b7e1044c7da5",
          // Authorization: process.env.secretKey,
        },
      });

      //return을 통해 이 비동기 함수 안에서 정의된 responseImageData를 내보낸다!
      return (async () => {
        let responseImageData = await Promise.all(
          imageResponse.data.documents.map((p) => {
            return {
              x: p.x,
              y: p.y,
              place: p.place_name,
              address: p.road_address_name,
              phone: p.phone,
              category: p.category_name,
              placeUrl: p.place_url,
              imageUrl: [],
            };
          })
        );
        console.log("before:", responseImageData.length);
        if (responseImageData.length > 5) {
          responseImageData = responseImageData.slice(0, 5);
          console.log("after:", responseImageData.length);
        }
        if (!responseImageData.length) {
          throw new Error(
            `${location}의 ${keywordlist[randomNumber]}이/가 존재하지 않습니다. 재검색해보세요`
          );
        } else {
    
          //crawling starts here
          //(async () => {
          const browser = await puppeteer.launch({
            headless: true,
          });
          const placeLength =
            responseImageData.length > 5 ? 5 : responseImageData.length;
          for (let i = 0; i < placeLength; i++) {
            let crawlingData = responseImageData[i].placeUrl;
            const page = await browser.newPage();
            await page.setViewport({
              width: 1366,
              height: 768,
            });
            await page.goto(crawlingData);
            await page
              .waitForSelector(".link_photo", { timeout: 4000 })
              .catch(() => console.log("Wait for my-selector timed out"));

            const content = await page.content();
            const $ = cheerio.load(content);
            const arrImageUrl = $(".link_photo");

            let length = arrImageUrl.length > 5 ? 5 : arrImageUrl.length;
            for (let j = 0; j < length; j++) {
              let crawlingImageUrl = [];
              console.log("imageurl here!!");

              if (arrImageUrl[j].attribs.style) {
                crawlingImageUrl = arrImageUrl[j].attribs.style.slice(22, -2);
                console.log(arrImageUrl[j].attribs)
              } else { 
                break;
              }

              console.log(
                `${crawlingData} 의 ${j + 1}번째 이미지 :`,
                crawlingImageUrl
              );
              //crawlingUrllist.push(crawlingImageUrl);

              console.log("before push");
              //console.log(responseImageData);
              responseImageData[i].imageUrl.push(crawlingImageUrl);
            }
          }
          browser.close();
        }
        console.log(
          `${location} 의 ${keywordlist[randomNumber]}는 ${imageResponse.data.meta.total_count} 개 \n 자세한 내용`,
          responseImageData
        );
        return responseImageData;
      })();

      // })
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
};
