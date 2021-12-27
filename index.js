import mongoose from 'mongoose'
import { productsService } from './src/model/products.js'
import { cartsService } from './src/model/carts.js'

mongoose.connect("mongodb+srv://Fabo:escabio69@cluster0.fec30.mongodb.net/ecommerce?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(async con => {
    let allProducts = await productsService.find()
    console.log(allProducts)
})