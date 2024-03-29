import Router from '@koa/router'
import * as UserControllers from "#components/user/user-controllers.js"
import { isAuthenticatedWithUser } from "#middlewares/jwt-handler.js"
const users = new Router()
users.post('/register', UserControllers.register)
users.post('/login', UserControllers.login)
users.get('/me', isAuthenticatedWithUser, (ctx)=>{
    ctx.body= {
        user:{
            email:ctx.state.user.email,
            id:ctx.state.user.id,
            firstname:ctx.state.user.firstname,
            lastname:ctx.state.user.lastname,
        }
    } 
})
users.put('/update', isAuthenticatedWithUser, UserControllers.updateUser)

export default users