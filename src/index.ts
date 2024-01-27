import e = require("express")
import mongoose from "mongoose"
import { url } from "./lib/mongoDB/mongoose"
import { Server } from "socket.io"
import cors = require('cors')
import router from "./routes"

interface RoomUser {
    room: string
    username: string
    id: string
}

const app = e()
mongoose.connect(url).then(() => console.log('Database connected with success!'))
app.use(cors())
app.use(e.json())
const io = new Server(8000, {
    cors: {
        origin: "https://watch-party-levi.vercel.app",
        methods: ["GET", "POST"]
    }
})
app.use('/', router)

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

app.listen('3100', () => console.log('Server is listen on port 3100'))