import { getDB } from "../../../config/mongoDb.js";
import applicationError from "../../../applicationLevelError/applicationError.js";
import { ObjectId } from "mongodb";


export default class workoutRepo{
    constructor(){
        this.collection="workouts"
    }
    async addWorkout(newWorkout){
        try {
            const db=await getDB();
            const collection=await db.collection(this.collection);
            return await collection.insertOne(newWorkout);
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
async workout(){
    try {
                    const db=await getDB();
            const collection=await db.collection(this.collection);
            return await collection.find().toArray()

    } catch (err) {
                    throw new applicationError("Wrong with db",500)

    }
}
    async getWorkoutById(wokroutId){
        try {
            const db=await getDB();
            const collection=await db.collection(this.collection);
           return await collection.findOne(
                {_id:new ObjectId(wokroutId)}
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async filterworkout(day,status){
                try {
            const db=await getDB();
            const collection=await db.collection(this.collection);

        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async updateWorkout(wokroutId,data){
                try {
            const db=await getDB();
            const collection=await db.collection(this.collection);
            const result= await collection.updateOne(
                {_id:new ObjectId(wokroutId)},
                {
                    $set:data
                        
                    
                }
            )
            return result;
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async deleteWorkout(wokroutId){
        try {
            const db=await getDB();
            const collection=await db.collection(this.collection);
            const result=await collection.deleteOne(
                {_id:new ObjectId(wokroutId)}
            )
            return result
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
}