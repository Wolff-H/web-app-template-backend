import Mongoose from "mongoose"
import { AutoIncrement } from "@/common/database-utils"

/**********************************************************************************************************************/

const _schema_options =
{
    collection: 'user',
}

const schema_user = new Mongoose.Schema({
    id:
    {
        type: Number,
        required: true,
        default: -1,
    },
    email:
    {
        type: String,
        required: true,
        default: '',
    },
    password:
    {
        type: String,
        required: true,
        default: '',
    },
    username:
    {
        type: String,
        required: true,
        default: '',
    },
    role:
    {
        type: String,
        required: true,
        default: 'user',
        enum: ['administrator', 'maintainer', 'user'],
    },
    roles:
    {
        type: [String],
        required: true,
        default: ['user'],
    },
}, _schema_options)
.plugin(AutoIncrement, {
    inc_field: 'id',
})

const model_user = Mongoose.model<CollectionUser>('user', schema_user, 'user')

interface CollectionUser
{
    id: number
    email: string
    password: string
    username: string
    role: 'administrator'|'maintainer'|'user'
    roles: ('administrator'|'maintainer'|'user')[]
}

/**********************************************************************************************************************/

export default model_user

export
{
    schema_user,
    model_user,
    CollectionUser,
}