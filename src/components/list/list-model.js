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
    created_at: {
        type:Date,
        required:true
    },
    updated_at: {
        type:Date,
        required:true
    }

})

const List = mongoose.model('List', listSchema)


export default List