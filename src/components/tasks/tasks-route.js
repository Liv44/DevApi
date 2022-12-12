import Router from '@koa/router'
import * as TaskControllers from '#components/tasks/tasks-controllers.js'
import { isAuthenticatedWithUser } from '#middlewares/jwt-handler.js'
const tasks = new Router()

tasks.get('/', isAuthenticatedWithUser, TaskControllers.findAll)
tasks.get('/protected', isAuthenticatedWithUser, (ctx)=>{
    ctx.body= {
        message:"this route is protected",
        user:ctx.state.user
    } 
})

tasks.get('/:id', isAuthenticatedWithUser, TaskControllers.findById)

tasks.get('/list/:listId', isAuthenticatedWithUser, TaskControllers.findByListId)

tasks.post('/', isAuthenticatedWithUser, TaskControllers.create)

tasks.put('/:id', isAuthenticatedWithUser, TaskControllers.update)

tasks.delete('/:id', isAuthenticatedWithUser, TaskControllers.deleteById)

export default tasks
