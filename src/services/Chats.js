import { sqlite } from "../config.js"
import { io } from '../app.js'

export default class Chats{
    constructor(){
        sqlite.schema.hasTable('chats').then(result => {
            if(!result){
                sqlite.schema.createTable('chats', table => {
                    table.string('user').notNullable()
                    table.string('message').notNullable()
                    table.string('date').notNullable()
                    table.timestamps(true,true)
                }).then(result => {
                    console.log('chats table created')
                })
            }
        })
    }
    getAllChats = async () => {
        try{
            let chats = await sqlite.select().table('chats')
            return {status:'success', payload:chats}
        }catch(error){
            console.log(error)
            return{status:'error', message:error}
        }
    }

    async saveChat(message){
        try{
            await sqlite.table('chats').insert(message)
            let fullChat = await sqlite.select().table('chats')
            io.emit('messagelog', fullChat)
            return{status:'succes', payload:`Chat saved in db sqlite`}
        }catch(error){
            console.log(`Error to save chat ${error}`)
                return {status:"error", message:"Error to save chat "+error}
        }
    }
}