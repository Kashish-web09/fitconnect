import dotenv from 'dotenv';
dotenv.config()
import { MongoClient } from "mongodb";


let client;

export const connectDb=async()=>{
    try {
        client=new MongoClient(process.env.DB_URL);
        await client.connect()
        console.log("MongoDb connected")
    } catch (err) {
        console.log(err)
    }
}

export const getDB=async()=>{
if(!client){
            throw new Error("Database is not connected.");

}
return client.db();
}