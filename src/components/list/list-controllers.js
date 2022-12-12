import List from "#components/list/list-model.js";
import Task from "#components/tasks/tasks-model.js";

import Joi from "joi";

export async function findAll(ctx){
    try{
        const userIdConnected = ctx.state.user.id

        ctx.body = await List.find({ userId:userIdConnected });
    }catch(error){
        ctx.badRequest({message: error.message})
    }
}

export async function findById(ctx){
    try {
        const userIdConnected = ctx.state.user.id

        if(!ctx.params.id) throw new Error('No id supplied')

        const list = await List.findOne({_id: ctx.params.id}).lean()

        if(!list || list.length=== 0) { return ctx.notFound() }
        
        if(!List.belongsToUserConnected(list, userIdConnected)){
            return ctx.unauthorized({message:"This user cannot access to this list."})
        }

        const tasks = await Task.findByListId(ctx.params.id)

        ctx.ok({list:list, tasks:tasks})

      } catch (e) {
        ctx.badRequest({ message: e.message })
      }
}

export async function create(ctx){
    try{
        const taskValidationSchema = Joi.object({
            title:Joi.string().required(),
            description: Joi.string(),
        })
        const { error, value } = taskValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)
        await List.create({...value, userId:ctx.state.user.id})
        ctx.status = 201
    }catch(err){
        console.log(err)
        ctx.badRequest({message: err.message})
    }
}

export async function update(ctx){
    try{
        const idValidationSchema = Joi.object({
            id:Joi.string().required(),
            title:Joi.string(),
            description:Joi.string()
        })
        const { error } = idValidationSchema.validate({
            id:ctx.params.id, 
            title:ctx.request.body.title, 
            description:ctx.request.body.description})
        if(error){
            throw new Error(error)
        }
        const updatedTask = {
            updated_at : new Date(),
        }
        if(ctx.request.body.title) updatedTask.title = ctx.request.body.title
        if(ctx.request.body.description) updatedTask.description = ctx.request.body.description

        const listUpdated = await List.updateOne({_id:ctx.params.id, userId : ctx.state.user.id}, updatedTask)
        if(!listUpdated){
            ctx.notFound("This list was not found.")
        }
        ctx.status = 200

    } catch(err){
        ctx.badRequest({message: err.message})
    }
}


export async function deleteById(ctx){
    try{
        const idValidationSchema = Joi.object({
            id:Joi.string().required()
        })
        const { error } = idValidationSchema.validate({id:ctx.params.id})
        if(error){
            throw new Error(error)
        }
        
        ctx.body = {
            list: await List.deleteOne({_id:ctx.params.id, userId : ctx.state.user.id}),
            tasks: await Task.find({list: ctx.params.id, userId:ctx.state.user.id}).remove(),
        }
    } catch(err){
        ctx.badRequest({message: err.message})
    }
}