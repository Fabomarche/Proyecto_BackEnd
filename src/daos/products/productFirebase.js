import admin from 'firebase-admin'
import FirebaseContainer from "../../containers/FirebaseContainer.js";

const db = admin.firestore()

export default class ProductFirebase extends FirebaseContainer {
    constructor(){
        super(db.collection('produtcs'))
    }
    async addProduct(product){
        try{
            const doc = await this.query.doc()
            let result = await doc.set(product)
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async updateProduct(id,body){
        try{
            let doc = await this.query.doc(id)
            const result = await doc.update(body)
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }
}
