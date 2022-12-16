import Router from '@koa/router'
import * as TaskControllers from '#components/list/list-controllers.js'
import { isAuthenticatedWithUser } from "#middlewares/jwt-handler.js"

const list = new Router()

list.get('/', isAuthenticatedWithUser, TaskControllers.findAll)

list.get('/:id', isAuthenticatedWithUser, TaskControllers.findById)

list.post('/', isAuthenticatedWithUser, TaskControllers.create)

list.put('/:id', isAuthenticatedWithUser, TaskControllers.update)

list.delete('/:id', isAuthenticatedWithUser, TaskControllers.deleteById)

export default list
