import { ShareMessageUseCase } from "./ShareMessageUseCase";
import { ShareMessageController } from "./ShareMessageController";
import { PusherProvider } from "../../Providers/Implementations/PusherProvider";
import { SocketProvider } from "../../Providers/Implementations/SocketProvider";

const pusherProvider = new PusherProvider()
const socketProvider = new SocketProvider()
const shareMessageUseCase = new ShareMessageUseCase(
    pusherProvider,
    socketProvider
)

const shareMessageController = new ShareMessageController(
    shareMessageUseCase
)

export { shareMessageUseCase, shareMessageController }