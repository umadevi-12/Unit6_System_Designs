import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes  from "./routes/authRoutes";
import boardRoutes from "./routes/boardRoutes";
import { initScoket } from './socket';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/boards',boardRoutes);
app.use('/api/tasks',taskRoutes);


const server = http.createServer(app);
const io  = new Server(server,{
    cors:{
        origin:process.env.CLIENT_URL, methods:['GET','POST']
    }
    
})
initSocket(io);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("mongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT||5000;

server.listen(PORT,() => console.log(`Server running on port ${PORT}`));
