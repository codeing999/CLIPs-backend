
<h1 align="center" > CLIPs (Chronically Late Insane Person) </h1>

<p align="center"><img width="300"  alt="로고" src="https://user-images.githubusercontent.com/89966037/194491956-c3573628-704f-436c-8435-965d45806f32.png"></p>

### <div align="center">[🔗 CLIPs 사이트 보러 가기](https://clipspromise.com)</div>
### <div align="center">[🎥 시연영상 보러가기](https://www.youtube.com/watch?v=t-h1CQnguYs)</div>

<br>

## 📢 CLIPs 프로젝트 소개
친구들끼리 약속을 정할 때 장소를 선택하기 어려운 경우가 있고 약속의 개수가 많아 관리가 어려울 때가 있습니다.
저희는 이런 어려움을 겪는 모든 이들을 위해 **약속 장소를 추천**해주고, **약속을 관리**하고 **추억**할 수 있는 서비스입니다.

<br>

## 📆 개발기간
### 2022.08.26 ~ 2022.10.03

<br>

## 💖 팀원 소개
프로젝트를 함께 진행한 팀원들입니다

<table>
   <tr>
    <td align="center">박신영</td>
    <td align="center"><a href="https://github.com/codeing999">이재철</a></td>
    <td align="center"><a href="https://github.com/Rumaro122">신용의</a></td>
    <td align="center"><a href="https://github.com/Minsun91">김민선</a></td>
    <td align="center"><a href="https://github.com/somfist">박정우</a></td>
    <td align="center"><a href="https://github.com/eastsunyong">윤선용</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qM0573umw5n32xmTgtsU4BAMGwDHuk99EA&usqp=CAU" width="100px" /></td>
    <td align="center"><a href="https://github.com/codeing999"><img src="https://avatars.githubusercontent.com/u/109027875?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/Rumaro122"><img src="https://avatars.githubusercontent.com/u/107511994?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/Minsun91"><img src="https://avatars.githubusercontent.com/u/92393851?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/somfist"><img src="https://avatars.githubusercontent.com/u/89966037?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/eastsunyong"><img src="https://avatars.githubusercontent.com/u/108984141?v=4" width="100px" /></a></td>
  </tr>
  <tr>
    <td align="center">Designer</td>
    <td align="center">(L)Back-end</td>
    <td align="center">Back-end</td>
    <td align="center">Back-end</td>
    <td align="center">(VL)Front-end</td>
    <td align="center">Front-end</td>
  </tr>
</table>

<br>

## 💡 핵심기능
+ **약속 장소 추천**
    + 검색된 주소를 바탕으로 주변 1.5km 이내 장소 추천 (카테고리 선택 가능)
    + 최대 10개의 다중 출발지의 중간 장소 확인
+ **약속 일정 관리**
    + 달력을 바탕으로 날짜별 약속 목록 확인
    + 약속 생성시 서비스의 회원을 추가하면 해당 회원과 약속 정보 공유
+ **약속 후기 관리**
    + 본인이 만든 약속별 이미지 후기 작성
    + 약속의 참여자들과 후기 정보 공유
+ **프로그래시브 웹 앱 (PWA)**
    + 홈화면에 설치되어 서비스 접근 용이하며 웹으로서 네이티브 앱과 같은 경험 제공

<br>

## 🔨 기술 스택

<code> Front-end </code>
* [👀 프론트엔드 깃허브](https://github.com/eastsunyong/CLIPS_Project)

<code> Back-end </code>
* Node.js, Express.js, Sequelize, AWS, S3, RDS, Puppeteer, Passport, Multer

<code>Tool</code>
* GitHub, Notion, Figma

<br>

## WIKI
### [컨벤션](https://github.com/codeing999/CLIPs-backend/wiki/Convention)

### [git 사용법 정리](https://github.com/codeing999/CLIPs-backend/wiki/git-guide)

### [CRUD 구현 정리](https://github.com/codeing999/CLIPs-backend/wiki/CRUD-guide)

### [Sequelize 활용 정리](https://github.com/codeing999/CLIPs-backend/wiki/sequelize-guide)

<br>

## 🖼 Service Architecture
   <img src="https://user-images.githubusercontent.com/89966037/194450508-94423765-35c3-403e-b015-dc296223c88d.png" width="100%" />

<br>

## ERD 설계

![image](https://user-images.githubusercontent.com/92393851/194463479-ae978462-98ad-45a8-ab10-462c9139ac96.png)

<br>

## 디렉토리 구조

<img width="202" alt="스크린샷 2022-10-07 05 41 40" src="https://user-images.githubusercontent.com/92393851/194463262-8289c092-4a03-4a6b-85ea-88263f762054.png">

<br>

## PACKAGES

```json
 "devDependencies": {
    "@babel/core": "^7.19.1", //테스트 코드용
    "@babel/preset-env": "^7.19.1", //테스트 코드용
    "artillery": "^2.0.0-23",  //부하 테스트 라이브러리
    "babel-jest": "^29.0.3", //테스트 코드용
    "cross-env": "^7.0.3",
    "husky": "^8.0.1",  //프리티어 적용 2중 장치로 커밋 시에도 프리티어 적용
    "jest": "^29.0.3",  //테스트 코드용
    "nodemon": "^2.0.19", //서버 재가동
    "sequelize-cli": "^6.4.1",  //시퀄라이즈 명령어 사용
    "supertest": "^6.2.4",  //통합 테스트용
    "swagger-jsdoc": "^6.2.5",  //API 작성을 돕는 라이브러리
    "swagger-ui-express": "^4.5.0"  //API 작성
  },
  "dependencies": {
    "aws-sdk": "^2.1212.0", //AWS S3 이용을 위한 sdk
    "axios": "^0.27.2", //API에 사용할 http 요청 생성 
    "bcrypt": "^5.0.1", //패스워드 암호화
    "chalk": "^5.0.1", //콘솔로그에 색을 칠해주는 기능
    "cheerio": "^1.0.0-rc.12",  //정적 크롤링
    "cors": "^2.8.5", // CORS 이슈 해결
    "dotenv": "^16.0.2",  //.env의 정보를 환경변수로 등록
    "express": "^4.18.1", //웹 서버 구축
    "express-session": "^1.17.3", //소셜로그인 패스포트에 사용
    "fs": "^0.0.1-security", //file system으로 이미지 파일 입출력 관리
    "joi": "^17.6.0", //유효성 검사
    "jsonwebtoken": "^8.5.1", //사용자 인증
    "lodash": "^4.17.21",
    "morgan": "^1.10.0", //로그 확인 
    "multer": "^1.4.5-lts.1", //formdata 타입 이미지 파일 업로드
    "multer-s3": "^2.10.0", //amazon S3와 연결
    "mysql2": "^2.3.3",
    "nth-check": "^2.1.1",
    "passport": "^0.6.0", //소셜 로그인 구현
    "passport-kakao": "^1.0.1",
    "passport-local": "^1.0.0",
    "puppeteer": "^17.0.0", //동적 크롤링
    "request": "^2.88.2", //url에 요청을 보내고 response를 받는 모듈로 동적 크롤링에서 사용
    "sequelize": "^6.21.4",  //ORM
    "swagger-autogen": "^2.22.0" //API 작성
  }
  ```
<br>
