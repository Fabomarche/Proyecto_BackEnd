import { productsModel } from "../daos/model/products";

export default class ProductsService{
    getAllProducts = async () => {
        let allProducts = await productsModel.find()
        return {status:'success', payload:allProducts}// cambiar al payload
    }
    getProductById = async (id) => {
        let product = await productsModel.findById(id)
        return {status:'success', payload:product}
    }
    
    addProduct = async (product) => {
        await productsModel.create(product)
        return {status:'success', message:`product ${product.title} added`}
    }
    
    updateProduct = async (id, body) => {
        try{
            let exists =  await mariadb.table('products').select().where('id', id).first()
            if(!exists) return {status:'error', message:"product id dosen't exists"}
            await mariadb.table('products').where('id', id).first().update(body)
            return {status:'success', message:`Product with id:${id} updated`}
        }catch(error){
            console.log(error)
            return {status:"error", message:error}
        }
    }

    deleteProductById = async (id) => {
        try{
            let exists =  await mariadb.table('products').select().where('id', id).first()
            if(!exists) return {status:'error', message:"product id dosen't exists"}
            await mariadb.table('products').where('id', id).first().del()
            return {status:'success', message:`Product with id:${id} deleted`}
        }catch(error){
            console.log(error)
            return {status:"error", message:error}
        }
    }
}