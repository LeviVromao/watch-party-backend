import { Request, Response } from "express"
import { CreateUserCase } from "./CreateUserUseCase"

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserCase
    ) {}

    async handle(response: Response, request: Request): Promise<Response> {
        const { email, password } = request.body
        try {
            const data = await this.createUserUseCase.execute({
                email,
                password
            })

            return response.status(201).json({ token: data.token })
        } catch (error) {
            const date = new Date()
            const hour = `${date.getHours()}:${date.getMinutes().toString().padStart(2,'0')}`
            return response.status(404).json({'message': error.message, 'hour': hour || 'Unexpected error.'})
        }
    }

}