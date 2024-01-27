import { IUserRepository } from "../IUserRepository";
import User from "../../entities/User";
import { UserModel } from "../../lib/mongoDB/mongoose";

export class MongoRepository implements IUserRepository{

    async findByEmail(email: string): Promise<User> {
        try {
         const user = await UserModel.findOne({email})
         return user
        } catch (error) {
         console.error(error)
        }
    }    

    async save(user: User): Promise<User> {
        try {
         const newUser = new UserModel(user)
         await newUser.save()
         return newUser
            
        } catch (error) {
         console.error(error)
        }
    }

    async findByToken(token: string): Promise<User> {
        try {
         const user = await UserModel.findOne({_id: token})
         return user
        } catch (error) {
            console.error(error)
        }
    }

    async updateUser(_id: string, name: string, photo: string): Promise<User> {
        try {
            const updateData = {
                name,
                picture: photo
            }
            const user = await UserModel.findByIdAndUpdate(_id, 
                updateData
            , {new: true})
            return user;
        } catch (error) {
            throw new Error(JSON.stringify(error.message))
        }
    }
}