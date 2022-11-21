import mongoose from 'mongoose'

const { Schema } = mongoose

const taskSchema = new Schema({
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
    },
    isDone : {
        type:Boolean,
        default:false,
    },
    list:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'List'
    }

})

taskSchema.static({
    findByListId(listId){
        return this.find({list:listId})
    }
})

const Task = mongoose.model('Task', taskSchema)


export default Task