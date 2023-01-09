import Task from "#components/tasks/tasks-model.js";
import List from "#components/list/list-model.js";

import Joi from "joi";

export async function findAll(ctx) {
    try {
        const userIdConnected = ctx.state.user.id

        ctx.body = await Task.find({ userId: userIdConnected });
    } catch (error) {
        ctx.badRequest({ message: error.message })
    }
}

export async function findById(ctx) {
    try {

        const userIdConnected = ctx.state.user.id

        const idValidationSchema = Joi.object({
            id: Joi.string().required()
        })
        const { error } = idValidationSchema.validate({ id: ctx.params.id })
        if (error) {
            throw new Error(error)
        }

        const taskFound = await Task.findById(ctx.params.id)

        if (!taskFound || taskFound.length === 0) {
            return ctx.notFound();
        }

        if (!Task.belongsToUserConnected(taskFound, userIdConnected)) {
            return ctx.unauthorized('This user cannot access to this task.')
        }

        ctx.ok(taskFound)

    } catch (err) {
        ctx.badRequest({ message: err.message })
    }
}

export async function findByListId(ctx) {
    try {
        const userIdConnected = ctx.state.user.id
        const listId = ctx.params.listId
        if (!listId) throw new Error("Please give an ID")

        const list = await List.findById(listId);

        if (!List.belongsToUserConnected(list, userIdConnected)) {
            return ctx.unauthorized('This user cannot access to tasks from a list that doesn\'t belongs to them')
        }

        const tasks = await Task.findByListId(listId, userIdConnected)
        ctx.ok(tasks)
    } catch (err) {
        ctx.badRequest({ message: err.message })
    }
}

export async function create(ctx) {
    try {

        const userIdConnected = ctx.state.user.id

        const created_at = new Date();
        const updated_at = new Date();
        const taskValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            list: Joi.string().required()
        })
        const { error } = taskValidationSchema.validate(ctx.request.body)
        if (error) throw new Error(error)

        const listFound = await List.findById(ctx.request.body.list);

        if (!List.belongsToUserConnected(listFound, userIdConnected)) {
            return ctx.unauthorized('This user cannot add a task to a list that doesn\'t belongs to them')
        }

        await Task.create({
            title: ctx.request.body.title,
            description: ctx.request.body.description,
            list: ctx.request.body.list,
            created_at,
            updated_at,
            userId: userIdConnected
        })
        ctx.status = 201
    } catch (err) {
        console.log(err)
        ctx.badRequest({ message: err.message })
    }
}

export async function update(ctx) {
    try {
        const idValidationSchema = Joi.object({
            id: Joi.string().required(),
            title: Joi.string(),
            description: Joi.string(),
            isDone: Joi.boolean(),
        })
        const { error } = idValidationSchema.validate({
            id: ctx.params.id,
            title: ctx.request.body.title,
            description: ctx.request.body.description,
            isDone: ctx.request.body.isDone
        })
        if (error) {
            throw new Error(error)
        }
        const updatedTask = {
            updated_at: new Date(),
        }
        if (ctx.request.body.title) updatedTask.title = ctx.request.body.title
        if (ctx.request.body.description) updatedTask.description = ctx.request.body.description
        updatedTask.isDone = ctx.request.body.isDone

        // Check if this user can delete this task
        const taskFound = await Task.findById(ctx.params.id);

        if (!taskFound || taskFound.length === 0) { return ctx.notFound() }

        if (!Task.belongsToUserConnected(taskFound, ctx.state.user.id)) {
            return ctx.unauthorized({ message: "This user cannot delete this list." })
        }

        await Task.updateOne({ _id: ctx.params.id, userId: ctx.state.user.id }, updatedTask)
        ctx.status = 200
    } catch (err) {
        ctx.badRequest({ message: err.message })
    }
}


export async function deleteById(ctx) {
    try {
        const idValidationSchema = Joi.object({
            id: Joi.string().required()
        })
        const { error } = idValidationSchema.validate({ id: ctx.params.id })
        if (error) {
            throw new Error(error)
        }

        // Check if this user can delete this task
        const taskFound = await Task.findById(ctx.params.id);

        if (!taskFound || taskFound.length === 0) { return ctx.notFound() }

        if (!Task.belongsToUserConnected(taskFound, ctx.state.user.id)) {
            return ctx.unauthorized({ message: "This user cannot delete this list." })
        }

        ctx.body = await Task.deleteOne({ _id: ctx.params.id, userId: ctx.state.user.id })
    } catch (err) {
        ctx.badRequest({ message: err.message })
    }
}