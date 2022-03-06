import KoaRouter from "koa-router"
import { constructResponse } from "@/common/response-utils"
import { CollectionUser, model_user } from "../collection-definitions/user"
import { CollectionTokens, model_tokens } from "../collection-definitions/tokens"

import { PREPATH } from "../config/environment"

/**********************************************************************************************************************/

const router = new KoaRouter().post(`${PREPATH}/getUserInformation`, async (ctx) => {
    // 准备数据 //
    const request_data = ctx.request.body
    const { user_token } = request_data

    // SQL定义：查询token //
    const query_select_tokens = model_tokens
        .findOne()
        .select('user_id')
        .$where(`this.user_token === '${user_token}'`)

    // SQL执行：查询token //
    const query_result_select_tokens = await query_select_tokens.exec<QuerySelectTokenResult|null>()

    let response = null

    if(query_result_select_tokens === null)
    {
        response = constructResponse({
            reason: '无此token',
        }, 'failed')
    }
    else
    {
        const { user_id } = query_result_select_tokens

        // SQL定义：查询user //
        const query_select_user = model_user
            .findOne()
            .select('username email')
            .$where(`this.id === ${user_id}`)

        // SQL执行：查询token //
        const query_result_select_user = await query_select_user.exec<QuerySelectUserResult|null>()

        response = constructResponse({
            username: query_result_select_user.username,
            email: query_result_select_user.email,
        })
    }

    // 写返回值 //
    ctx.body = response
})

type QuerySelectTokenResult = Pick<CollectionTokens, 'user_id'>
type QuerySelectUserResult = Pick<CollectionUser, 'username'|'email'>


/**********************************************************************************************************************/

export default router