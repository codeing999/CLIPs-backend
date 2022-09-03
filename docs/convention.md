# 스크립트

```javascript
 "scripts": {
    "db:init": "node ./src/db-init.js", //db 초기화
    "start:dev": "nodemon ./src/app.js",    //개발용 서버 켜기
    "start": "pm2 ./src/app.js"     //배포용 서버 켜기. (지금은 pm2 없으므로 안먹힘)
  },
```

# Git 사용 전략

## 브런치 명명법

- main : 배포용
- develop : 개발 단계에서 각자 작업 병합할 브랜치

  아래는 필요에 따라 생성 후 develop에 병합하고 나면 local과 origin 모두에서 삭제.

- feature/기능명 : 기능 구현 시
- fix/기능명 : error 수정 시
- refactor/기능명 : 기능 개선 시

## 2. 커밋 명명법

- 파일 만들었을 때 : create 파일명
- 파일을 일반적으로 수정했을 때 : modify 파일명
- 파일에 다른 기능을 추가했을 때 : add 파일명 feature 기능명
- 파일의 에러를 수정했을 때 : fix 파일 - 에러 내용
- 파일을 리팩토링(기능은 같으나 성능이나 구조를 개선) : enhance 파일
- 파일을 지웠을 때 : delete 파일

## 3. ISSUE 작성 규칙

- 문제점

작업 내용에 대한 간단한 설명
에러 코드 :
의도한 결과 :
실제 결과 :

- 시도한 내용

본인 코드 등등

# Coding Convention

## Naming

- 함수명, 변수명 : Camel Case
- 클래스명 : Pascal Case
- DataBase의 테이블명, 컬럼명 : Camel Case? Snake Case? 미정
- prettier 기본 설정 사용. 저장 시마다 적용.
- husky 사용. 커밋 시마다 prettier 적용 (이중 장치)

## Clean Code

- console.log는 모두 지우기
- 불필요한 주석은 사용하지 않기

# 기타 합의 사항

- DataBase는 MySQL 사용. ORM은 Sequelize 사용.
- 유효성 검사에 joi 사용
