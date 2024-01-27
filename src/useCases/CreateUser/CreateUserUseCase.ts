import { ICreateUserDTO } from "./CreateUserDTO";
import { IUserRepository } from "../../Repositories/IUserRepository";
import { IUserSecurityProvider } from "../../Providers/IUserSecurityProvider"
import User from "../../entities/User";

export class CreateUserCase{
    constructor(
        private iUserRepository: IUserRepository,
        private iUserSecurityProvider: IUserSecurityProvider
    ) {}

    async execute( data: ICreateUserDTO ) {
        const userAlreadyExist = await this.iUserRepository.findByEmail(data.email)
        const date = new Date()
        const hour = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
        if(userAlreadyExist) {
          throw new Error("Usuário já cadastrado. Tente outra vez")
        }
        if(data.password.length < 9) {
         throw new Error("Senha muito curta. Somente senhas de 9 caracteres ou mais.")
        }

        const encryptedPass = await this.iUserSecurityProvider.encryptPass(data.password)

        const newData = {
         password: encryptedPass,
         email: data.email
        }

        const user = new User(newData)

        const newUser: User = await this.iUserRepository.save(user)
        const token = this.iUserSecurityProvider.configureJWT(newUser.id)
        return { token, hour }
    }  
}