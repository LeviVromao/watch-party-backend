import {Request, Response} from 'express'
import { ShareMessageUseCase } from './ShareMessageUseCase'
export class ShareMessageController {
   constructor(
    private shareMessageUseCase: ShareMessageUseCase
   ){}
    async handle(request: Request, response: Response): Promise<Response> {
        const { sendMessage: message, room, user: name } = request.body;
        const token = request.headers.authorization
        try {        
         const error = await this.shareMessageUseCase.execute({
          message, room, name, token
         })

         if(error) {
          return response.status(401).json({message: error})
         }
         return response.status(200).json({})

        } catch (error) {
            return response.status(404).json({message: error.message || "Unexpected Error."})
        }
    }
}