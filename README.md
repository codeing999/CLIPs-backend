# CLIPs-backend

- CLIPs : 약속 장소 및 주변 맛집 추천 서비스

## 팀원 정보

- @codeing999
- @Minsun91
- @Rumaro122

![image](https://user-images.githubusercontent.com/109027875/187682382-34d04dc6-3372-491a-be79-0e4da6318d02.png)

## DOCS

### [컨벤션](./docs/convention.md)

### [git 사용법 정리](./docs/git.md)

### [CRUD 구현 정리](./docs/crud.md)

### [Sequelize 활용 정리](./docs/sequelize.md)

## API 명세

## 시스템 아키텍처 (백엔드)

<img width="577" alt="스크린샷 2022-09-16 12 35 53" src="https://user-images.githubusercontent.com/92393851/190620485-5135948f-cc70-4fca-8125-faf46e8848e3.png">


## ERD 설계

![image](https://user-images.githubusercontent.com/92393851/190625568-d45138a4-2cf4-45e6-ae15-ad1ed70bb385.png)


## 디렉토리 구조

![image](https://user-images.githubusercontent.com/109027875/187568132-51222ea7-4a30-49ce-8252-1ff37ce01977.png)

## PACKAGES

```json
 "devDependencies": {
    "@babel/core": "^7.19.1", //통합 테스트
    "@babel/preset-env": "^7.19.1", //통합 테스트
    "artillery": "^2.0.0-23",  //스트레스 테스트
    "babel-jest": "^29.0.3", //통합 테스트
    "cross-env": "^7.0.3",
    "husky": "^8.0.1",  //프리티어 적용 2중 장치로 커밋 시에도 프리티어 적용
    "jest": "^29.0.3",  //테스트 코드
    "nodemon": "^2.0.19",
    "sequelize-cli": "^6.4.1",  //시퀄라이즈 명령어 사용
    "supertest": "^6.2.4",  //통합 테스트
    "swagger-jsdoc": "^6.2.5",  //API 작성
    "swagger-ui-express": "^4.5.0"  //API 작성
  },
  "dependencies": {
    "aws-sdk": "^2.1212.0", //AWS S3 이용을 위한 sdk
    "axios": "^0.27.2", //API 에 사용할 http 요청 생성 
    "bcrypt": "^5.0.1", //패스워드 암호화
    "chalk": "^5.0.1", //콘솔로그에 색을 칠해주는 기능
    "cheerio": "^1.0.0-rc.12",  //정적 크롤링
    "cors": "^2.8.5",
    "dotenv": "^16.0.2",  //환경변수 사용 
    "express": "^4.18.1", //웹 서버 구축
    "express-session": "^1.17.3", //소셜로그인 패스포트에 사용
    "fs": "^0.0.1-security", //file system으로 이미지 파일 입출력 관리
    "joi": "^17.6.0", //유효성 검사
    "jsonwebtoken": "^8.5.1", //사용자 인증
    "lodash": "^4.17.21",
    "morgan": "^1.10.0", //로그 확인 
    "multer": "^1.4.5-lts.1", //formdata 타입 파일 업로드
    "multer-s3": "^2.10.0", //amazon S3와 연결
    "mysql2": "^2.3.3",
    "nth-check": "^2.1.1",
    "passport": "^0.6.0", //소셜 로그인 구현 시에 사용
    "passport-kakao": "^1.0.1",
    "passport-local": "^1.0.0",
    "puppeteer": "^17.0.0", //동적 크롤링
    "request": "^2.88.2", //url에 요청을 보내고 response를 받는 모듈로 동적 크롤링에서 사용
    "sequelize": "^6.21.4",  //ORM
    "swagger-autogen": "^2.22.0" //API 작성
  }
```
