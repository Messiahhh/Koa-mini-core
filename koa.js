const Emitter = require('events')
const http = require('http')

const compose = (middlewares) => {
    let length = middlewares.length
    return function (ctx) {
        return dispatch(0)
        function dispatch(i) {
            if (i < length) {
                let fn = middlewares[i]
                fn(ctx, dispatch.bind(null, (i + 1)))
            }
        }
    }
}

class Koa extends Emitter {
    constructor() {
        super()
        this.middlewares = []
        this.context = null
    }

    callback() {
        const fn = compose(this.middlewares)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handlerRequest(ctx, fn)
        }
    }

    use(fn) {
        this.middlewares.push(fn)
        return this
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args)
    }


    createContext(req, res) {
        this.context = {
            req,
            res,
        }
        return this.context
    }

    handlerRequest(ctx, fn) {
        const res = ctx.res
        res.statusCode = 404
        fn(ctx)
    }


}

// const Koa = require('koa')
const app = new Koa()
const logger = () => {
    return (ctx, next) => {
        console.log(ctx.req.method, ctx.req.url);
        next()
    }
}

app.use(logger())
app.use((ctx, next) => {
    console.log(1);
    next()
    console.log(2);
})

app.use((ctx, next) => {
    ctx.res.writeHeader(200, {'Content-type': 'text/plain; charset=utf-8'})
    ctx.res.end('hello world')
})


app.listen(3000)
