import { Server } from "socket.io";
import { ISocketProvider } from "../ISocketProvider";
interface RoomUser {
    room: string
    username: string
    id: string
}

export class SocketProvider implements ISocketProvider {
    constructor(){}
    handleSocket(io: Server): void {
        
    const users: Array<RoomUser> = []

    io.on("connection", socket => {
        console.log("a user connected");
        socket.on("room:join", ({room, username, id}) => {
            socket.join(room)
            const userInRoom = users.find(user => user.username === username && user.room === room)
            if(!userInRoom) {
                users.push({
                    username,
                    room,
                    id
                })
            }
        })

        socket.on("messages", data => {
            const dataToSend = {
                message: data.sendMessage,
                user: data.user,
            }
            io.to(data.room).emit('message', dataToSend)
        }) 

        socket.on("videos", data => {
            const url = data.video;
            const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=[\w-]+)(?:\S+)?|embed\/[\w-]+|v\/[\w-]+|(?:(?:[\w-]+\.)*[\w-]+\/?)\S+)|youtu\.be\/[\w-]+)$/;
            const isYoutubeURL = regex.test(url);
            if(isYoutubeURL) {
                const videoID = data.video.match(/(?:\/|%3D|v=|vi=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/)[1];
                io.to(data.room).emit("video", videoID)
            }
        })

    })
    }
}