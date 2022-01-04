import admin from 'firebase-admin'
import config from '../config/config.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const serviceAccount = require('../daos/db/ecommerce-54e02-firebase-adminsdk-voaxs-1b33208023.json')

admin.initializeApp({
        credential:admin.credential.cert(serviceAccount),
        databaseURL: config.fireBase.baseUrl
    })

export default class FirebaseContainer {
    constructor(query){
        this.query = query
    }
    getAll = async() => {
        try{
            const data = await this.query.get()
            const documents = data.docs
            const formatDocs = documents.map(document => document.data())
            return {status:"success", payload:formatDocs}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async getById(idNumber){
        try{
            const doc = this.query.doc(idNumber)
            let document = await doc.get()
            if(document.data()){
                return {status:"success", payload: document.data()}
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
            const doc = this.query.doc(idNumber)
            await doc.delete()
            return { status: 'success', message:`objetct with id:${idNumber} was deleted`}
        }
        catch(err){
            return{status:"error", mesagge:`objetct with id:${idNumber} wasn't deleted - ${err}`}
        }
    }

    async deleteAll(){
        try{
            this.query.get().then( result => {
                result.forEach(el => {
                    el.ref.delete()
                })
            }
                
            )
            
            return{status:"success", mesagge:`all objects deleted`}
        }
        catch(err){
            return{status:"error", mesagge:`couldn't delete all objects - ${err}`}
        }
    }
}