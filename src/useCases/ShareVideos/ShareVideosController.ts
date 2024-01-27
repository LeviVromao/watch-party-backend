import { ShareVideoUseCase } from "./ShareVideosUseCase";
import { Request, Response } from "express";

export class ShareVideosController {
    constructor(
        private shareVideosUseCase: ShareVideoUseCase
    ){}

    async handle(request: Request, response: Response): Promise<Response> {
        const { video, room } = request.body
        const token = request.headers.authorization

        try {
            await this.shareVideosUseCase.execute({
                room,
                video,
                token
            })
            return response.status(200).json({})
        } catch (error) {
            return response.status(404).json({message: error.message || "Unexpected error."})
        }
    }
}