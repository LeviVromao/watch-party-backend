import e = require("express")
import mongoose from "mongoose"
import { url } from "./lib/mongoDB/mongoose"
import { shareMessageController } from "./useCases/ShareMessage"
import { shareVideosController } from "./useCases/ShareVideos"
import { Server } from "socket.io"
import cors = require('cors')
import router from "./routes"

const app = e()
mongoose.connect(url).then(() => console.log('Database connected with success!'))
app.use(cors())
app.use(e.json())
app.use('/', router)

app.listen('3100', () => console.log('Server is listen on port 3100'))