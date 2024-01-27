import { JwtPayload } from "jsonwebtoken";
import User from "../entities/User";

export interface IUserRepository {
    findByEmail(email: string): Promise<User>
    save(user: User):Promise<User>
    findByToken(token: string | JwtPayload): Promise<User>
    updateUser(_id: string, name: string, photo: string): Promise<User>
}