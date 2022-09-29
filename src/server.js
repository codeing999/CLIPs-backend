const app = require('./app');
const port = 3000;

app.listen(port, () => {
    console.log(port, '번 포트에서 대기 중');
})