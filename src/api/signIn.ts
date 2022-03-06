import KoaRouter from "koa-router"
import { constructResponse } from "@/common/response-utils"
import { CollectionUser, model_user } from "../collection-definitions/user"
import { model_tokens } from "../collection-definitions/tokens"

import { PREPATH } from "../config/environment"
import generateUserToken from "@/common/auth-utils/tokens/user-token"

/**********************************************************************************************************************/

const router = new KoaRouter().post(`${PREPATH}/signIn`, async (ctx) => {
    // 准备数据 //
    const request_data = ctx.request.body
    const { email, password, if_remember_me } = request_data

    // SQL定义：查询用户 //
    const query_select_user = model_user
        .findOne()
        .select('id password username email role roles')
        .$where(`this.email === '${email}'`)

    // SQL执行：查询用户 //
    const query_result_select_user = await query_select_user.exec<QuerySelectUserResult|null>()

    let response = null

    if(query_result_select_user === null)
    {
        response = constructResponse({
            reason: '无此用户',
        }, 'failed')
    }
    else
    {
        if(query_result_select_user.password !== password)
        {
            response = constructResponse({
                reason: '密码错误',
            }, 'failed')
        }
        else
        {
            const user_token = generateUserToken(email, if_remember_me ? [10, 'd'] : [2, 'm'])

            // SQL定义：更新用户token //
            const query_update_tokens = model_tokens
                .updateOne({},
                    {
                        user_id: query_result_select_user.id,
                        user_token: user_token
                    },
                    {
                        upsert: true
                    }
                )
                .$where(
                    `this.user_id === ${query_result_select_user.id}`
                )

            // SQL执行：更新用户token //
            await query_update_tokens.exec()
            
            response = constructResponse({
                username: query_result_select_user.username,
                email: query_result_select_user.email,
                role: query_result_select_user.role,
                roles: query_result_select_user.roles,
                user_token: user_token[0],
            })
        }
    }

    // 写返回值 //
    ctx.body = response
})

type QuerySelectUserResult = Pick<CollectionUser, 'id'|'username'|'password'|'email'|'role'|'roles'>

/**********************************************************************************************************************/

export default router