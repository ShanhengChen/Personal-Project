const Koa = require('koa');
const path = require('path');
const cors = require('@koa/cors');
const routes = require('./routes');
const mount = require('koa-mount');
const serve = require('koa-static');
const app = new Koa();

app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use(routes.routes());
app.use(mount('/static',serve(path.join(__dirname,'./static'))));
app.on('error', (error) => {
    console.error("Internal Error", error);
});

app.listen(3000, () => {
    console.log("Server is open, now listening on port 3000");
});
