import { ShareVideosController } from "./ShareVideosController";
import { ShareVideoUseCase } from "./ShareVideosUseCase";
import { PusherProvider } from "../../Providers/Implementations/PusherProvider";

const pusherProvider = new PusherProvider()
const shareVideosUseCase = new ShareVideoUseCase(
    pusherProvider
)

const shareVideosController = new ShareVideosController(
    shareVideosUseCase
)

export { shareVideosController, shareVideosUseCase }