import Router from '@koa/router'
import * as TaskControllers from '#components/list/list-controllers.js'

const list = new Router()

list.get('/', TaskControllers.findAll)

list.get('/:id', TaskControllers.findById)

list.post('/', TaskControllers.create)

list.put('/:id', TaskControllers.update)

list.delete('/:id', TaskControllers.deleteById)

export default list
