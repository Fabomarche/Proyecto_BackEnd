import mongoose from 'mongoose'

const collectionRef = 'products'

const ProductsSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    descrption: {
        type:String,
        required:false
    },
    stock: {
        type:Number,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    code: {
        type:Number,
        required:false
    },
    thumbnail: {
        type:String,
        required:true
    }

})

export const productsService = mongoose.model(collectionRef, ProductsSchema)