const Koa = require('./index.js')
const Router = require('./router/index.js')

const app = new Koa()

const router = new Router()

router.get('/getInfo', (ctx, next) => {
    console.log('getInfo界面');
    ctx.res.writeHeader(200, {'Content-type': 'text/plain; charset=utf-8'})
    ctx.res.end('getInfo!!!')
})

router.get('/', (ctx, next) => {
    console.log('主页');
    ctx.res.writeHeader(200, {'Content-type': 'text/plain; charset=utf-8'})
    ctx.res.end('hello world')
})

app.use(router.routes())

app.listen(3000)
