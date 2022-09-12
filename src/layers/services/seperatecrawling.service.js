// const MainRepository = require("../repositories/main.repository");
const request = require("request");
const axios = require("axios");
const { query } = require("express");

//크롤링
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = class SeperateCrawlingService {
  
    //crawling starts here
  crawlData = async (placeUrl) => {
    let crawlingUrllist = [];
    try {
      const browser = await puppeteer.launch({
        headless: true,
      });

      const page = await browser.newPage();
      await page.setViewport({
        width: 1366,
        height: 768,
      });
      await page.goto(placeUrl);
      await page
        .waitForSelector(".link_photo", { timeout: 1000 })
        .catch(() => console.log("Wait for my-selector timed out"));

      const content = await page.content();
      const $ = cheerio.load(content);
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

        // console.log(`${placeUrl} 의 ${j + 1}번째 이미지 :`, crawlingImageUrl);
        crawlingUrllist.push(crawlingImageUrl);
      }

      browser.close();
      return crawlingUrllist;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //opening hour crawling starts here
  crawlTimeData = async (placeUrl) => {
    //   const rawArrDateUrl = [];
    try {
      const browser = await puppeteer.launch({
        headless: true,
      });

      const page = await browser.newPage();
      await page.setViewport({
        width: 1366,
        height: 768,
      });
      await page.goto(placeUrl);
      await page
        .waitForSelector(".list_operation", { timeout: 1000 })
        .catch(() => console.log("Wait for my-selector timed out"));
      const content = await page.content();
      const $ = cheerio.load(content);
      const rawArrDateUrl = $(".txt_operation").text().split("\n")[0]; //".txt_operation"
    //   const rawArrTimeUrl = $(".time_operation").text().split("\n")[0];
      console.log(`${placeUrl} 의 영업시간 :`, rawArrDateUrl );
      browser.close();

      const crawlTimeData = { rawArrDateUrl };
      return crawlTimeData;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
};
