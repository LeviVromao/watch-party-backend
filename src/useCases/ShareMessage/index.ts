import { ShareMessageUseCase } from "./ShareMessageUseCase";
import { ShareMessageController } from "./ShareMessageController";
import { PusherProvider } from "../../Providers/Implementations/PusherProvider";

const pusherProvider = new PusherProvider()
const shareMessageUseCase = new ShareMessageUseCase(
    pusherProvider
)

const shareMessageController = new ShareMessageController(
    shareMessageUseCase
)

export { shareMessageController, shareMessageUseCase }