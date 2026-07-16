import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { connectDb } from './config/mongoDb.js';
const PORT=process.env.PORT || 1750;
const server=async()=>{
    try {
        await connectDb();
        app.listen(PORT,()=>{
            console.log(`http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log("Failde to connect with DB",err)
    }
};
server();