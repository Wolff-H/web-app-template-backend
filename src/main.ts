import Koa from "koa"
import KoaBodyParser from "koa-bodyparser"

import { connectMongoDB } from "@/common/database-utils"

import API from "@/api/index"

import sslogger from "@/common/sslogger"

/**********************************************************************************************************************/

// 扩展全局 //
(global as any)['sslogger'] = sslogger

const app = new Koa()

// koa-bodyparser //
app.use(KoaBodyParser())

// 跨域 //
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    
    if (ctx.method == 'OPTIONS')
    {
        ctx.body = 200
        // sslogger(ctx)
        // do nothing
    }
    else
    {
        await next()
    }
})

// 注册路由 //
for(const router of API)
{
    app.use(router.routes())
}

// 连接数据库 //
connectMongoDB()

app.listen(3000)

console.log('app started at port 3000...')

/**********************************************************************************************************************/