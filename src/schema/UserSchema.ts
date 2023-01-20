import * as Joi from 'joi'

const postSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
})

const putSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
})

const UserSchema = {postSchema, putSchema}

export default UserSchema