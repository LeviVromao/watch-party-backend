import { IshareMessageDTO } from "./ShareMessageDTO";
import { PusherProvider } from "../../Providers/Implementations/PusherProvider";
import Pusher = require("pusher");

export class ShareMessageUseCase {
    constructor(
        private pusherProvider: PusherProvider
    ){}

    async execute(data: IshareMessageDTO): Promise<string> {
        if(!data.token) {
         throw new Error("Invalid access");
        }

       try {
        this.pusherProvider.configureMessage(data.message, data.name, data.room)
       } catch (error) {
        return error.message
       }
    }
}