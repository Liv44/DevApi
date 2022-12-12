import Router from "@koa/router";
import exemplesRoutes from '#components/exemple/exemple-route.js'
import listRoutes from "#components/list/list-route.js";
import tasksRoutes from "#components/tasks/tasks-route.js";
import userRoutes from "#components/user/user-route.js";



const API_V1_ROUTER = new Router({prefix: '/api/v1'})

API_V1_ROUTER.use('/exemples', exemplesRoutes.routes(), exemplesRoutes.allowedMethods())
API_V1_ROUTER.use('/tasks', tasksRoutes.routes(), tasksRoutes.allowedMethods())
API_V1_ROUTER.use('/lists', listRoutes.routes(), listRoutes.allowedMethods())
API_V1_ROUTER.use('/users', userRoutes.routes(), userRoutes.allowedMethods())


export { API_V1_ROUTER }