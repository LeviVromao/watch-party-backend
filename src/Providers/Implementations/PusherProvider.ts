import Pusher = require('pusher')
import { IPusherProvider } from "../IPusherProvider";
import { config } from 'dotenv';
config()

export class PusherProvider implements IPusherProvider {
    constructor(){}
    configureVideo(url: string, room: string): void{
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=[\w-]+)(?:\S+)?|embed\/[\w-]+|v\/[\w-]+|(?:(?:[\w-]+\.)*[\w-]+\/?)\S+)|youtu\.be\/[\w-]+)$/;
        const validURL = regex.test(url)
        if( validURL ) {
            const videoID = url.match(/(?:\/|%3D|v=|vi=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/)[1];
            const pusher = new Pusher({
                appId: process.env.APPID,
                key: process.env.KEY,
                secret: process.env.SECRETPUSHER,
                cluster: "sa1",
                useTLS: true
            });
            pusher.trigger(room, "videos", { 
                video: videoID
            });
        } else {
            throw new Error("Invalid video, try another URL please.")
        }
    }

    configureMessage(message: string, name: string, room: string): void {
        if(!message || !room) {
            throw new Error("You're not allowed to access this.")
        }

        const pusher = new Pusher({
            appId: process.env.APPID,
            key: process.env.KEY,
            secret: process.env.SECRETPUSHER,
            cluster: "sa1",
            useTLS: true
        });
        
        const sanitizedMess = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        pusher.trigger(room, 'messages', { 
            message: sanitizedMess, 
            name
        });

    }   
}