import mongoose from 'mongoose'

const { Schema } = mongoose

const listSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps: true
})


listSchema.static({
    belongsToUserConnected(list, userId){
        if(list.userId===userId){
            return true
        }
        return false
    }
})

const List = mongoose.model('List', listSchema)

export default List