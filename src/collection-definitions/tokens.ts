import Mongoose from "mongoose"

/**********************************************************************************************************************/

const _schema_options =
{
    collection: 'tokens',
}

const schema_tokens = new Mongoose.Schema({
    user_id:
    {
        type: Number,
        required: true,
        default: -1,
    },
    user_token:
    {
        type: [String, Number],
        required: true,
        default: ['', -1, -1],
    },
}, _schema_options)

const model_tokens = Mongoose.model<CollectionTokens>('tokens', schema_tokens, 'tokens')

interface CollectionTokens
{
    user_id: number
    user_token: [token: string, issued_timestamp: number, expired_timestamp: number]
}

/**********************************************************************************************************************/

export default model_tokens

export
{
    schema_tokens,
    model_tokens,
    CollectionTokens,
}