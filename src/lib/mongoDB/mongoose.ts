import mongoose from 'mongoose'
import { config } from 'dotenv'
config()


if(!process.env.MONGODB_URI) {
    throw new Error('Create a enviroment named MONGODB_URI!!')
}

const url: string = process.env.MONGODB_URI
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    picture: String
})

const UserModel = mongoose.models.UserModel || mongoose.model('User', userSchema)

export {
    mongoose,
    UserModel,
    url
}