import { Server } from "socket.io";
import { ShareVideoUseCase } from "./ShareVideosUseCase";

export class ShareVideosController {
    constructor(
        private shareVideosUseCase: ShareVideoUseCase
    ){}

    handle(io: Server): void {
        try {
            this.shareVideosUseCase.execute(io)
        } catch (error) {
            
        }
    }
}