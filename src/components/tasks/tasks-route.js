import Router from '@koa/router'
import * as TaskControllers from '#components/tasks/tasks-controllers.js'
import { isAuthenticatedWithUser } from '#middlewares/jwt-handler.js'
const tasks = new Router()

tasks.get('/', TaskControllers.findAll)
tasks.get('/protected', isAuthenticatedWithUser, (ctx)=>{
    ctx.body= {
        message:"this route is protected",
        user:ctx.state.user
    } 
})

tasks.get('/:id', TaskControllers.findById)
tasks.get('/list/:listId', TaskControllers.findByListId)

tasks.post('/', TaskControllers.create)

tasks.put('/:id', TaskControllers.update)

tasks.delete('/:id', TaskControllers.deleteById)

export default tasks
