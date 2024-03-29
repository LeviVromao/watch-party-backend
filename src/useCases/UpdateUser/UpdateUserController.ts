import { Response, Request } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase
    ){}
    async handle(request: Request, response: Response): Promise<Response> {
        const { image: picture, id, name } = request.body
        try {
            this.updateUserUseCase.execute({
                picture,
                id,
                name
            })
            return response.status(200).json({})
        } catch (error) {
            return response.status(404).json({message: error.message || "Unexpected error"})
        }
    }
}