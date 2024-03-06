import { AuthorizeUserUseCase } from "./AuthorizeUserUseCase"
import { Response, Request } from "express"

export default class AuthorizeUserController {
    constructor(
        private authorizeUserUseCase: AuthorizeUserUseCase
    ){
    }
    async handle(response: Response, request: Request): Promise<Response | void>{
        const { email, password } = request.body
        try {
            const token = await this.authorizeUserUseCase.execute({
                email, 
                password
            })
            return response.status(200).json(token)
        } catch (error) {
            return response.status(404).json({message: error.message || "Unexpected error"})
        }
    }
}       