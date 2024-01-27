import { JwtPayload } from "jsonwebtoken";
import { IUserSecurityProvider } from "../IUserSecurityProvider";
import { IUserRepository } from "../../Repositories/IUserRepository";
import { compare, hash } from "bcryptjs";
import * as jwt from "jsonwebtoken"
import { config } from "dotenv";
config()

export class BcryptProvider implements IUserSecurityProvider {
    constructor(
        private iUserRepository: IUserRepository
    ){}
    
    async comparePass(email: string, password: string): Promise<boolean> {
        const user = await this.iUserRepository.findByEmail(email)
        return await compare(password, user.password)
    }

    configureJWT(id: string, email?: string): string | JwtPayload {
        if(!email) {
            return jwt.sign(id, process.env.SECRET)
        }
    }

    encryptPass(password: string): Promise<string> {
        return hash(password, 13)
    }

    decodeJWT(token: string): string | JwtPayload {
        const decodedToken = jwt.decode(token)
        return decodedToken
    }
}