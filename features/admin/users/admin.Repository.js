import {getDB} from '../../../config/mongoDb.js'
import applicationError from '../../../applicationLevelError/applicationError.js'

export default class adminRepo{
    constructor() {
        this.collection="adminUser"
    }

    async signup(newAdmin){
        try {
            const db=await getDB();
            const collection=await db.collection(this.collection)
            return await collection.insertOne(newAdmin)
        } catch (err) {
            throw new applicationError("Wrong with DB",500)
        }
    }
        async findAdmin(email){
        try {
            const db=await getDB();
            const collection=await db.collection(this.collection)
            return await collection.findOne({email})
        } catch (err) {
            throw new applicationError("Wrong with DB",500)
        }
    }

}