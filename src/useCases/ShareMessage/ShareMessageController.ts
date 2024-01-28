import { Server } from 'socket.io'
import { ShareMessageUseCase } from './ShareMessageUseCase'

export class ShareMessageController {
   constructor(
    private shareMessageUseCase: ShareMessageUseCase
   ){}
    
   handle(io: Server): void {
        this.shareMessageUseCase.execute(io)
   }
}