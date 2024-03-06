import { IUserRepository } from "../../Repositories/IUserRepository";
import { IUserSecurityProvider } from "../../Providers/IUserSecurityProvider";
import User from "../../entities/User";

export class GetUserUseCase {
 constructor(
    private iUserRepository: IUserRepository,
    private iUserSecurityProvider: IUserSecurityProvider
 ){}

 async execute(token: string, session: string): Promise<User>{
  if(!token && !session) {
    throw new Error("Invalid access!");
  }
  
  if(token) {
    const decodedToken = this.iUserSecurityProvider.decodeJWT(token)
    const user = await this.iUserRepository.findByToken(decodedToken)
    return user

  } else {
    const userData = JSON.parse(session)
    const user = await this.iUserRepository.findByEmail(userData.email)
    return user
  }
 }
}