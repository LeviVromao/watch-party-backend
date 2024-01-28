import { ShareVideosController } from "./ShareVideosController";
import { ShareVideoUseCase } from "./ShareVideosUseCase";
import { PusherProvider } from "../../Providers/Implementations/PusherProvider";
import { SocketProvider } from "../../Providers/Implementations/SocketProvider";

const pusherProvider = new PusherProvider()
const socketProvider = new SocketProvider()
const shareVideosUseCase = new ShareVideoUseCase(
    pusherProvider,
    socketProvider
)

const shareVideosController = new ShareVideosController(
    shareVideosUseCase
)

export { shareVideosController, shareVideosUseCase }