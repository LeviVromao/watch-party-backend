import { IUpdateUserDTO } from "./IUpdateUserDTO";
import { IUserRepository } from "../../Repositories/IUserRepository";

export class UpdateUserUseCase {
    constructor(
        private iUserRepository: IUserRepository
    ){}
    async execute(data: IUpdateUserDTO) {
        if(!data.id) {
            throw new Error("You're not allowed to access this.")
        }

        try {
            const user = await this.iUserRepository.updateUser(data.id, data.name, data.picture)
            console.log(user)
            if(!user) {
                throw new Error("Email / senha incorretos.")
            }
        } catch (error) {
            throw new Error(JSON.stringify(error.message))
        }
    }
}