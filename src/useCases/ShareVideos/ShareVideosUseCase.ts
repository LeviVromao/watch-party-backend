import { IShareVideosDTO } from "./IShareVideosDTO";
import { IPusherProvider } from "../../Providers/IPusherProvider";
import { SocketProvider } from "../../Providers/Implementations/SocketProvider";
import { Server } from "socket.io";

export class ShareVideoUseCase {
    constructor(
        private iPusherProvider: IPusherProvider,
        private iSocketProvider: SocketProvider
    ){}
    
    execute(io: Server): void{
        try {
            this.iSocketProvider.handleSocket(io)
        } catch (error) {
            throw new Error(error)
        }
    }
}