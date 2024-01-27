import { IUserRepository } from "../../Repositories/IUserRepository";
import { IUserSecurityProvider } from "../../Providers/IUserSecurityProvider";
import User from "../../entities/User";

export class GetUserUseCase {
 constructor(
    private iUserRepository: IUserRepository,
    private iUserSecurityProvider: IUserSecurityProvider
 ){}

 async execute(token: string): Promise<User>{
  if(!token) {
    throw new Error("Invalid access!");
  }
  
  const decodedToken = this.iUserSecurityProvider.decodeJWT(token)
  const user = this.iUserRepository.findByToken(decodedToken)
  return user
 }
}