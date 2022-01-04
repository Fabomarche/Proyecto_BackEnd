import mongoose from 'mongoose'
const { Schema } = mongoose
import MongoContainer from "../../containers/MongoContainer.js";

export default class CartMongo extends MongoContainer{
    constructor(){
        super(
            'carts',
            {
                products:[{
                    type:Schema.Types.ObjectId,
                    ref:'products',
                }]                
            },{ timestamps:true }
        )
    }

    async createCart(){
        try{
            let newCart = await this.collection.create({products:[]})
            return {status:"succes", messagge:'new cart created', payload:newCart}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async addProduct(idNumber, productId){
        try{
            let result = await this.collection.updateOne({_id:idNumber},{$push:{products:productId}})
            return {status:"success", payload:result}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error to add product ${productId} in Cart ${idNumber}: ${err}`}
            
        }
    }

    async getProductsByCartId(idNumber){
        try{
            const cart = await this.collection.findById(idNumber)
            const products = cart.products
            return {status:"success", payload:products}
        }catch(err){
            return {status:"error", message:err}
        }
    }

    async deleteProduct(idNumber, productId){
        try{
            let result = await this.collection.updateOne({_id:idNumber},{$pull:{products:productId}})
            return {status:"success", message:`product deleted at cart ${idNumber}`, payload:result}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error to delete product ${productId} in Cart ${idNumber}: ${err}`}
            
        }
    }

}