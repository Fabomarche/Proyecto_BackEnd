import FileContainer from "../../containers/FileContainer.js";
import fs from 'fs'

export default class ProductFileSystem extends FileContainer {
    constructor(){
        super('products.txt')
    }

    async addProduct(product){
        try{
            
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let products =  JSON.parse(data)
            
            if(products.some(prod => prod.title === product.title)){
                console.log(`${JSON.stringify(product.title)} already exist`)
                return {status:"error", message:"Product already exists"}
            }else{
                let dataProduct = Object.assign({
                    id: products.length + 1,
                    timestamp: Date.now(),
                    title: product.title,
                    description: product.description || "",
                    code:product.code || "",
                    price: product.price,                                                                                                                                     
                    thumbnail: product.thumbnail,
                    stock: product.stock || 0                                                                                                       
                })
                
                products.push(dataProduct)
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(products, null, 2))
                    return {status:"success", message:"Product added"}
                }catch(err){
                    console.log(`can't write archive ${err}`)
                    return {status:"error", message:"error to add product "+err}
                }
            }
        }
        catch(err){
            console.error(err)
            return { status: 'error', message: err.message }
        }
    }

    async updateProduct(id,body){
        try{
            console.log(body)
            let data = await fs.promises.readFile(this.url,'utf-8');
            let products = JSON.parse(data);
            if(!products.some(prod => prod.id === id)) return {status:"error", message:`No products with this id: ${id}`}
            let result = products.map( product => {
                if(product.id === id){
                        body = Object.assign(body)
                        console.log(body)
                        body = Object.assign({id:product.id,...body});
                        return body;
                }else{
                    return product;
                }
            })
            try{
                await fs.promises.writeFile(this.url, JSON.stringify(result,null,2));
                return {status:"success", message:"Product updated"}
            }catch(err){
                return {status:"error", message:"Error to update product "+err}
            }
        }catch(err){
            return {status:"error",message:"Error to update product: "+err}
        }
    }// solo funciona con x-www-form-urlencoded
}