import mongoose from "mongoose";
import config from '../config/config.js'

mongoose.connect(config.mongo.baseUrl, {useNewUrlParser:true, useUnifiedTopology:true})

export default class MongoContainer{
    constructor(collection, schema, timestamps){
        this.collection = mongoose.model(collection, new mongoose.Schema(schema, timestamps))
    }

    getAll = async() => {
        try{
            let documents = await this.collection.find()
            return {status:"success", payload:documents}
        }catch(err){
            return {status:"error", error:err}
        }
    }

    async getById(idNumber){
        try{
            let document = await this.collection.findById(idNumber)
            
            if(document){
                return {status:"success", payload: document}
            }else{
                console.log(null)
                return {status:"error", error: 'Object not found'}
            }
            
        }
        catch(err){
            return{status:"error", error:`Can't get entity with id:${id} on ${this.url} - ${err}`}
        }
    }

    async deleteById(idNumber){
        try{
            await this.collection.deleteOne({"_id": idNumber})
            return{status:"success", mesagge:`objetct with id:${idNumber} was deleted`}
        }
        catch(err){
            return{status:"error", mesagge:`objetct with id:${idNumber} wasn't deleted - ${err}`}
        }
    }

    async deleteAll(){
        try{
            const result = await this.collection.deleteMany({})
            return{status:"success", mesagge:`all objects deleted}`}
        }
        catch(err){
            return{status:"error", mesagge:`couldn't delete all objects- ${err}`}
        }
    }
}