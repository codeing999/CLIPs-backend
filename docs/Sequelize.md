# 설치

```terminal
npm i sequelize
npm i sequelize-cli -D
npm i mysql2
```

# 초기 작업

```terminal
//config, migrations, models, seeders 폴더 생성
npx sequelize init

//config.json 파일 작성.
config

//config.json에 명시된 이름으로 데이터베이스 생성. (실제 로컬에 db는 mysql server 프로그램이나 docker 등으로 생성 해놓아야 함)
npx sequelize db:create

//migration과 model 파일 생성
npx sequelize model:generate --name User --attributes email:string,nickname:string,password:string

// 다른 예시들
npx sequelize model:generate --name note --attributes noteid:integer,userid:integer,title:string,content:string,createdat:date,like:integer
npx sequelize model:generate --name comment --attributes commentid:integer,userid:integer,noteid:integer,content:string,createdat:date
npx sequelize model:generate --name user --attributes userid:integer,nickname:string,password:string
npx sequelize model:generate --name User --attributes userId:integer,name:string,password:string,phone:string
npx sequelize model:generate --name Promise --attributes


```

# 명령어

```terminal
npx sequelize db:create //db 생성
npx sequelize db:drop   /db 삭제

```

migration 관련
`현재 프로젝트에서는 migration은 사용 안할 예정. model:generat로 모델 파일 생성 후엔, 마이그레이션 파일은 삭제`

```terminal
// 생성된 migration들 적용하여 실제 테이블 생성
npx sequelize db:migrate

//특정 이름으로 migration 파일 직접 생성
npx sequelize migration:create --name 이름

//마이그레이션 실행 취소 (실행한 순 역순으로 내부에 작성된 down 실행)
npx sequelize db:migrate:undo
```

# model 파일 작성

model 파일의 init 메소드에는 테이블 내용을 작성하고
그 아래에는 다음과 같이 associate 메소드를 만들고 관계성 작성.

```javascript
User.init(
  {
    /*컬럼 작성*/
  },
  {
    /*테이블 정보 작성*/
  }
);
User.associate = function (models) {
  /*관계성 작성*/
};
```

## 컬럼 작성

```javascript
//Primary Key 예시
userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
```

## 테이블 정보 작성

```javascript
{
    sequelize,
    modelName: "User",  //모델명 지정
    tableName: "user",  //테이블명 지정
    timestamps: false,  //createdAt, updatedAt 자동 생성 여부
    pranoid: false,     //얕은 삭제 여부. 얕은 삭제 시 실제 삭제 되지 않고 deleteAt 에 삭제 시간 찍힘.
    underscored: true,  //snake case 사용 여부.
    //한글을 사용하기 위한 설정. 안해줘도 문제는 없었음.
    charset: "utf8",
    collate : "utf8_general_ci"
}
```

## 관계성 작성

### 1대 다 관계 예시

```javascript
//user.js
User.hasMany(models.LikeAndDislike, {
  foreignKey: "userId",
  sourceKey: "userId",
  onUpdate: "cascade",
  onDelete: "cascade",
  constraints: false,
  as: "subjectUser", //두 테이블 간에 외래키 관계가 두개 이상일 경우 구분하기 위한 명칭.
});
//likeanddislike.js
LikeAndDislike.belongsTo(models.User, {
  foreignKey: "userId",
  targetKey: "userId",
  onUpdate: "cascade",
  onDelete: "cascade",
  constraints: false,
  as: "subjectUser",
});
```

### 다대다 관계 예시

```javascript
//user.js
User.belongsToMany(models.Promise, {
  as: "friend",
  through: "Friend", //다대다 관계를 연결하는 해당 테이블 자동 생성됨.
  foreignKey: "userId",
  sourceKey: "userId",
});
//promise.js
Promise.belongsToMany(models.User, {
  as: "promise",
  through: "Friend",
  foreignKey: "promiseId",
  sourceKey: "promiseId",
  timestamps: false, //한쪽에라도 이거 작성해주면 자동 생성된 테이블에 적용됨.
});
```

# model 파일로 실제 테이블 생성

## db-init.js 파일 작성

```javascript
require("dotenv").config({ path: "../.env" });
const { sequelize } = require("./sequelize/models");
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db connect seccess");
  })
  .catch((err) => {
    console.error(err);
  });
```

## package.json에 스크립트 작성

```json
"db:init": "node ./src/db-init.js",
```

터미널에

```terminal
npm run db:init
```

입력 시 기존 db 리셋하고 새로 db와 테이블 생성.

# Sequelize 메소드 Return값

### create

- 실패 시
  - 유니크가 깨질 땐(ID 중복) 에러 발생.
  - 나머지 경우는 시도해봐야겠음
- 성공 시 해당 정보.

### find

- 찾으면 해당 정보,
- 못찾으면 null

### update

- 성공하면 [1], affectendRows로 영향받은 row수 확인 가능
- 실패하면 [0]

### delete

- 성공하면 1, affectendrows로 영향받은 row수 확인 가능
- 실패하면 0
