import {mariadb} from '../config.js'

export default class Products{
    constructor(){
        mariadb.schema.hasTable('products').then(result => {
            
            if(!result){
                mariadb.schema.createTable('products', table => {
                    table.increments()
                    table.string('title').notNullable()
                    table.integer('price').notNullable()
                    table.string('thumbnail')
                    table.string('description')
                    table.integer('stock').notNullable()
                    table.string('code').notNullable().defaultTo('')
                    table.timestamps(true,true)
                }).then(result => {
                    console.log('products table created')
                })
            }
        })
    }
    getAllProducts = async () => {
        try{
            let products = await mariadb.select().table('products')
            return {status:'success', payload:products}//en fs solo retornaba products y quisas haga falta JSON.parse(JSON.stringfy(products))
        }catch(error){
            return{status:'error', message:error}
        }
    }
    getProductById = async (id) => {
        try{
            let product = await mariadb.select().where('id', id).table('products').first()
            if(product){
                return {status:'success', payload:product}
            }else{
                return {status:'error', message:"Product not found"}
            }
        }catch(error){
            console.log(error)
            return {status:"error", message:"catch error: "+error}
        }
    }
    
    addProduct = async (product) => {
        try{
            let exists = await mariadb.table('products').select().where('title', product.title).first()
            if(exists) return {status:'error', message:'tittle already exists'}
            let result = await mariadb.table('products').insert(product)
            return{status:'success', payload:`Product added with id: ${result[0]}`}
        }catch(error){
            console.log(error)
            return {status:"error", message:error}
        }
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