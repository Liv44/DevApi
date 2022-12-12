import UserModel from "#components/user/user-model.js"
import Joi from 'joi'
import argon2 from 'argon2'
import { sendWelcomeEmail } from "#services/mailing/welcome-email.js"

export async function register(ctx){
    try{
        const registerValidationSchema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().min(6).required(),
            terms_and_conditions:Joi.boolean().valid(true).required(),
            firstname:Joi.string(),
            lastname:Joi.string(),
        })
        const params = ctx.request.body
        const {error, value}= registerValidationSchema.validate(params)

        if(error) throw new Error(error)

        const hashedPassword = await argon2.hash(value.password)
        const newUser = new UserModel({
            ...value,
            password:hashedPassword,
            settings:{
                terms_and_conditions:value.terms_and_conditions
            }
        })
        newUser.generateEmailVerificationToken()
        const user = await newUser.save()
        sendWelcomeEmail(user, user.settings.validation_email_token)
        const token = user.generateJWT();
        ctx.ok({token})
    }catch(err){
        ctx.badRequest({message:err.message})
    }
}

export async function login(ctx){
    try{
        const loginValidationSchema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required(),
        })
        const params = ctx.request.body
        const {error, value}= loginValidationSchema.validate(params)
        if(error) throw new Error(error)

        const findUser = await UserModel.findOne({email:value.email}).select('password')
        if(!findUser) throw new Error('This Email doesn\'t exists on database')

        if(!await argon2.verify(findUser.password, value.password)) throw new Error('Wrong Password')

        const token = findUser.generateJWT();
        ctx.ok({token})

    }catch(err){
        ctx.badRequest({message:err.message})
    }
}

export async function updateUser(ctx){
    try{
        const updateValidationSchema=Joi.object({
            firstname:Joi.string(),
            lastname:Joi.string()
        })

        const userIdConnected = ctx.state.user.id

        const params = ctx.request.body

        const {error, value}= updateValidationSchema.validate(params)
        if(error) throw new Error(error)

        const userUpdated = await UserModel.findByIdAndUpdate(userIdConnected, value)

        ctx.ok({user:{
            email:userUpdated.email,
            id:userUpdated.id,
            firstname:userUpdated.firstname,
            lastname:userUpdated.lastname,
        }})
    }catch(err){
        ctx.badRequest({message:err.message})
    }
}

