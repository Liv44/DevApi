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
},{
    timestamps: true
})

const List = mongoose.model('List', listSchema)


export default List