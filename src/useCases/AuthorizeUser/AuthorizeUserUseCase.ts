import { IUserSecurityProvider } from "../../Providers/IUserSecurityProvider";
import { IUserRepository } from "../../Repositories/IUserRepository";
import { AuthorizeUserDTO } from "./AuthorizeUserDTO";

export class AuthorizeUserUseCase {
    constructor(
        private iUserRepository: IUserRepository,
        private iUserSecurityProvider: IUserSecurityProvider
    ){}

    async execute(data: AuthorizeUserDTO) {
        const email = await this.iUserRepository.findByEmail(data.email)
        if(!email) {
            throw new Error('Email incorreto, por favor tente de novo.');
        }

        const validPass = await this.iUserSecurityProvider.comparePass(data.email, data.password)
        if(!validPass) {
            throw new Error('Senha incorreta, por favor tente outra');
        }
        const token = this.iUserSecurityProvider.configureJWT(email.id)

        return token
    }
}