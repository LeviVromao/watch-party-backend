import { PusherProvider } from "../../Providers/Implementations/PusherProvider";
import { Server } from "socket.io";
import { SocketProvider } from "../../Providers/Implementations/SocketProvider";

export class ShareMessageUseCase {
    constructor(
        private pusherProvider: PusherProvider,
        private socketProvider: SocketProvider
    ){}

    async execute(io: Server): Promise<string> {
       try {
        this.socketProvider.handleSocket(io)
       } catch (error) {
        return error.message
       }
    }
}