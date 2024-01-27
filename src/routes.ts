import { createUserController } from "./useCases/CreateUser";
import { authorizeUserController } from "./useCases/AuthorizeUser";
import { shareMessageController } from "./useCases/ShareMessage";
import { getUserController, getUserUseCase } from "./useCases/GetUser";
import { Server } from "socket.io";
import { Router } from "express";
import { shareVideosController } from "./useCases/ShareVideos";
import { updateUserController } from "./useCases/UpdateUser";
const router = Router()

router.post('/register', async (req, res) => {
 return createUserController.handle(res, req)
})

router.post('/login', async (req, res) => {
 return authorizeUserController.handle(res, req);
})

router.post('/messages', async (req, res) => {
 return shareMessageController.handle(req, res);
})

router.post('/user', async (req, res) => {
    return getUserController.handle(req, res);
})

router.post('/videos', async (req, res) => {
    return shareVideosController.handle(req, res);
})

router.post('/updateUser', async (req, res) => {
    return updateUserController.handle(req, res);
})
interface RoomUser {
    room: string
    username: string
    id: string
}

const io = new Server(8000, {
    cors: {
        origin: "https://watch-party-levi.vercel.app",
        methods: ["GET", "POST"]
    }
})

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

export default router