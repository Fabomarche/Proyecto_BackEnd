import MongoContainer from "../../containers/MongoContainer.js";
import messages from "../model/messages.js"
import { normalize, schema } from 'normalizr'

export default class ChatMongo extends MongoContainer{
    constructor(){
        super(
            'chats',
            
        )
    }

    getAllNormalizedChats = async() => {
        try{
            let documents = await this.collection.find()
            let chats = {id:'chats', chats:documents}
            console.log(chats)
            const authorSchema = new schema.Entity('authors')
            const postsSchema = new schema.Entity('posts',{
                authors:authorSchema,
            })
            const normalizedData = normalize(chats, postsSchema)
            console.log(JSON.stringify(normalizedData,null,2))
            return {status:"success", payload:normalizedData}
        }catch(err){
            return {status:"error", error:err}
        }
    }


    async saveChat(chat){
        try{
            let result = await this.collection.create(chat)
            return {status: "success", payload:result}
        }catch(err){
            console.log(`No se pudo escribir el archivo ${err}`)
            return {status:"error", message:"Error al agregar chat "+err}
        }
    }

}