import { Server } from "socket.io"

export interface ISocketProvider {
    handleSocket(io: Server): void
}