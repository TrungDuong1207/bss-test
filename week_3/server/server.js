const Koa = require('koa');
const cors = require('koa2-cors');
const route = require('./src/routes/index.route');
const bodyParser = require('koa-bodyparser');

const PORT = 8000;
const app = new Koa();

app.use(cors());
app.use(bodyParser());

route(app);
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});