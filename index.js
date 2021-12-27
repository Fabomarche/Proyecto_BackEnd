import mongoose from 'mongoose'
import { productsModel } from './src/dao/model/products.js'
import { cartsService } from './src/dao/model/carts.js'

mongoose.connect("mongodb+srv://Fabo:escabio69@cluster0.fec30.mongodb.net/ecommerce?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(async con => {
    // let allProducts = await productsModel.find()
    // console.log(allProducts)
})