// const MainRepository = require("../repositories/main.repository");
const request = require("request");
const axios = require("axios");
const { query } = require("express");

//크롤링

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = class MainService {
   //카테고리 랜덤으로 반환하여 place_url(추후에 imageUrl 크롤링 위한) 추출
  getList = async (location, category) => {
    //구까지 받은 location을 x,y 좌표로 변환하기
    try {
      const keywordlist = ["음식점", "카페", "운동장", "헬스장", "술집"];
      let randomIndexArray = []; //랜덤 숫자들
      let newArr = []; //카테고리랑 랜덤 숫자 섞어서 새로운 배열 생성

      for (let i = 0; i < keywordlist.length; i++) {
        let randomWhile = Math.floor(Math.random() * keywordlist.length);
          if (randomIndexArray.indexOf(randomWhile) === -1) {
            randomIndexArray.push(randomWhile);} else {
              i--;
          }}
            for (let j = 0; j < randomIndexArray.length; j++) {
            newArr[j] = keywordlist[randomIndexArray[j]];
          } 

        //입력받은 동네의 주소를 가져오기
        const addressResponse = await axios({
          method: "get",
          url: "https://dapi.kakao.com/v2/local/search/address.json",
          params: { query: `${location}`,radius: 1500 }, //body값
          headers: {
            Authorization: process.env.secretKey,
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
        //중복값 피하기 위해 랜덤 숫자 배열 만들기
        // const keywordlist = ["음식점", "카페", "운동장", "헬스장", "술집"];
        // let randomIndexArray = [];
        // for (let i = 0; i < keywordlist.length; i++) {
        //   let randomWhile = Math.floor(Math.random() * keywordlist.length);
        //   if (randomIndexArray.indexOf(randomWhile) === -1) {
        //     randomIndexArray.push(randomWhile);
        //   } else {
        //     i--;
        //   }
        // }

        //입력받은 동네 위치와 랜덤 카테고리 조합으로 추천 리스트 만들기
        for (let k = 0; k < newArr.length; k++) {
        const imageResponse = await axios({
          method: "get",
          url: "https://dapi.kakao.com/v2/local/search/keyword.json",
          params: {
            radius: 1500,
            // query: `${keywordlist[randomIndexArray[j]]}`,
            query: `${newArr[k]}` ||  `${category}`,
            y: `${responseAdressData[0].y}`,
            x: `${responseAdressData[0].x}`,
          },
          headers: {
            Authorization: process.env.secretKey,
          },
        });

        const responseImageData = imageResponse.data.documents.map((p) => {
          return {
            x: p.x,
            y: p.y,
            place: p.place_name,
            address: p.road_address_name,
            phone: p.phone,
            // category: `${keywordlist[randomIndexArray[j]]}`,
            category: `${newArr[k]}`,
            placeUrl: p.place_url,
          };
        });

        if (!responseImageData.length) {
          throw new Error(
            `${location}의 ${newArr[k]}이/가 존재하지 않습니다. 재검색해보세요`);
        } else {
          return {
            message: `${location}의 ${newArr[k]}이/가 ${responseImageData.length} 개 있습니다.`,
            data: responseImageData,
          };
        }}
    } catch (err) {
      console.log(err);
      return { message: err.message }
    }
  }

  //crawling starts here
  crawlData = async (placeUrl) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const Page = await browser.newPage();
      let crawlingUrllist = [];
      await Page.goto(placeUrl);
      await Page
        .waitForSelector(".link_photo", { timeout: 1000 })
        .catch(() => console.log("Wait for my-selector timed out"));

      const content = await Page.content();
      let $ = cheerio.load(content);
      const rawArrImageUrl = $(".link_photo");
      
      const arrImageUrl = rawArrImageUrl.filter((v) => {
        return rawArrImageUrl[v].attribs.style;
      });

      let length = arrImageUrl.length > 5 ? 5 : arrImageUrl.length;
      for (let j = 0; j < length; j++) {
        let crawlingImageUrl = [];

        if (arrImageUrl[j].attribs.style) {
          crawlingImageUrl = arrImageUrl[j].attribs.style.slice(22, -2);
          // console.log(arrImageUrl[j].attribs);
        } else {
          break;
        }
        crawlingUrllist.push(crawlingImageUrl);
        }
        const rawArrDateUrl = $(".txt_operation").text().split("\n")[0]; 
      browser.close();
      return {crawlingUrllist, rawArrDateUrl};

    } catch (err) {
      console.log(err);
      return { message: err.message };
    }

    //opening hour crawling starts here
    // const rawArrDateUrl = [];
    // try {
    //   const browser = await puppeteer.launch({
    //     headless: true,
    //   });

    //   const page = await browser.newPage();
    //   await page.goto(placeUrl);
    //   await page
    //     .waitForSelector(".list_operation", { timeout: 1000 })
    //     .catch(() => console.log("Wait for my-selector timed out"));
    //   const content = await page.content();
    //   const $ = cheerio.load(content);
    //   const rawArrDateUrl = $(".txt_operation").text().split("\n")[0]; //".txt_operation"
    //   // const rawArrTimeUrl = $(".time_operation").text().split("\n")[0];
    //   console.log(`${placeUrl} 의 영업시간 :`, rawArrDateUrl);
    //   browser.close();

    //   const crawlTimeData = { rawArrDateUrl  }; //rawArrTimeUrl
    //   const allCrawlData = { crawlingUrllist, crawlTimeData };
    //   return allCrawlData;
    // } catch (err) {
    //   console.log(err);
    //   return { message: err.message };
    // }
  }
}
