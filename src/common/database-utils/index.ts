import Mongoose from "mongoose"
import MongooseSequence from "mongoose-sequence"



const AutoIncrement = MongooseSequence(Mongoose)

function connectMongoDB(uri: string, options?: any)
{
    Mongoose.connect(uri, options)
    // .then((mongoose_obj) => {
    //     sslogger('mongoose-object', mongoose_obj)
    // })
}

function disconnectMongoDB()
{    
    Mongoose.disconnect()
}



export default
{
    AutoIncrement,
    connectMongoDB,
    disconnectMongoDB,
}

export
{
    AutoIncrement,
    connectMongoDB,
    disconnectMongoDB,
}