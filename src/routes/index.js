import Router from "@koa/router";
import exemplesRoutes from '#components/exemple/exemple-route.js'

const API_V1_ROUTER = new Router({prefix: '/api/v1'})

API_V1_ROUTER.use('/exemples', exemplesRoutes.routes(), exemplesRoutes.allowedMethods())

export { API_V1_ROUTER }