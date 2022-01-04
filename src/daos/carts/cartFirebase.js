import admin from 'firebase-admin'
import FirebaseContainer from "../../containers/FirebaseContainer.js";

const db = admin.firestore()

export default class CartFirebase extends FirebaseContainer {
    constructor(){
        super(db.collection('carts'))
    }

    async createCart(){
        try{
            const doc = await this.query.doc()
            let newCart = await doc.set({products:[]})
            return {status:"succes", payload:newCart}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async addProduct(idNumber, productId){
        try{
            const cartDoc = await this.query.doc(idNumber).get()
            const cart = cartDoc.data()
            const products = [...cart.products, productId]
            await this.query.doc(idNumber).set({products})
            return {status:"success", message:`Product added to cart`}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error to add product ${productId} in Cart ${idNumber}: ${err}`}
            
        }
    }

    async getProductsByCartId(idNumber){
        try{
            const cartDoc = await this.query.doc(idNumber).get()
            const cart = cartDoc.data()
            const products = cart.products
            return {status:"success", payload:products}
        }catch(err){
            return {status:"error", message:err}
        }
    }
    
    async deleteProduct(idNumber, productId){
        try{
            const cartDoc = await this.query.doc(idNumber).get()
            const cart = cartDoc.data()
            const products = cart.products.filter(prod => prod !== productId)
            await this.query.doc(idNumber).set({ products: products})

            return {status:"success", message:`product ${productId} deleted at cart ${idNumber}`}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error to delete product ${productId} in Cart ${idNumber}: ${err}`}
            
        }
    }
}