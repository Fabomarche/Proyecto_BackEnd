import MongoContainer from "../../containers/MongoContainer.js";

export default class ChatMongo extends MongoContainer{
    constructor(){
        super(
            'chats',
            {
                author:{
                    id:{
                        type:String,
                        required:true
                    },
                    firstName:{
                        type:String,
                        required:true
                    },
                    lastName:{
                        type:String,
                        required:true
                    },
                    age:{
                        type:Number,
                        required:true
                    },
                    firstName:{
                        type:String,
                        required:true
                    },
                    alias:{
                        type:String,
                        required:true
                    },
                    avatarUrl:{
                        type:String,
                        required:true
                    },
                },
                text:{
                    type:String,
                    required:true
                },
                date:{
                    type:String,
                    required:true
                }
            }, { timestamps: true }
        )
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