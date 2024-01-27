import { IShareVideosDTO } from "./IShareVideosDTO";
import { IPusherProvider } from "../../Providers/IPusherProvider";

export class ShareVideoUseCase {
    constructor(
        private iPusherProvider: IPusherProvider
    ){}
    async execute(data: IShareVideosDTO): Promise<void>{
        if(!data.token) {
            throw new Error("You're not allowed to acces this!")
        }
        
        try {
            this.iPusherProvider.configureVideo(data.video, data.room)
        } catch (error) {
            throw new Error(error)
        }
    }
}