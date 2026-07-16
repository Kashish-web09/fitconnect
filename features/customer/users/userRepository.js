import { getDB } from "../../../config/mongoDb.js";
import applicationError from '../../../applicationLevelError/applicationError.js'

export default class userRepo{
    constructor(){
        this.collection="customerUser"
    }
    async signup(newUser){
        try {
            const db=await getDB();
            const collection=db.collection(this.collection);
          const result=  await collection.insertOne(newUser);
          return result;
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
    async findUser(email){
        try {
                        const db=await getDB();
            const collection=db.collection(this.collection);
            return await collection.findOne({email});

        } catch (err) {
            console.log(err)
                        throw new applicationError("Wrong with db",500)

        }
    }
    // async signin(req,res,next){
    //     try {
    //                     const db=getDB();
    //         const collection=db.collection(this.collection);

    //     } catch (err) {
    //                     throw new applicationError("Wrong with db",500)

    //     }
    // }



}