import database from "../config.js";

export default class noProducts{
    constructor(){
        database.schema.hasTable('products').then(result => {
            
            if(!result){
                database.schema.createTable('products', table => {
                    table.increments()
                    table.string('title').notNullable()
                    table.integer('price').notNullable()
                    table.string('thumbnail')
                    table.string('description')
                    table.integer('stock').notNullable()
                    table.string('code')
                    table.timestamps(true,true)
                }).then(result => {
                    console.log('products table created')
                })
            }
        })
    }
    getAllProducts = async () => {
        try{
            let products = await database.select().table('products')
            return {status:'success', payload:products}//en fs solo retornaba products
        }catch(error){
            return{status:'error', message:error}
        }
    }
    getProductById = async (id) => {
        try{
            let product = await database.select().table('products').where('id', id).first()
            if(user){
                return {status:'success', payload:product}
            }else{
                return {status:'error', message:"Product not found"}
            }
        }catch(error){
            return {status:"error", message:"catch error: "+error}
        }
    }
    registerProduct = async (user) => {
        try{

        }catch(error){
            return {status:"error", message:error}
        }
    }
}