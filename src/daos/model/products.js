import mongoose from 'mongoose'

const collectionRef = 'products'

const ProductsSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        default:""
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
        type:String,
        required:false,
        unique: true
    },
    thumbnail: {
        type:String,
        required:true
    }

})

export const productsModel = mongoose.model(collectionRef, ProductsSchema)