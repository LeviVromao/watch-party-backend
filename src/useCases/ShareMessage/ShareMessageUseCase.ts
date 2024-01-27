import { IshareMessageDTO } from "./ShareMessageDTO";
import { PusherProvider } from "../../Providers/Implementations/PusherProvider";

export class ShareMessageUseCase {
    constructor(
        private pusherProvider: PusherProvider
    ){}

    async execute(data: IshareMessageDTO): Promise<string> {
       try {
        this.pusherProvider.configureMessage(data.message, data.name, data.room)
       } catch (error) {
        return error.message
       }
    }
}