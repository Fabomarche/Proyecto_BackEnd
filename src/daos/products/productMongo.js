import MongoContainer from "../../containers/MongoContainer.js";

export default class ProductMongo extends MongoContainer{
    constructor(){
        super(
            'products',
            {   title: {
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
                    required:true,
                    unique: true
                },
                thumbnail: {
                    type:String,
                    required:true
                }
            }, { timestamps: true }
        )}

    async addProduct(product){
        try{
            let result = await this.collection.create(product)
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async updateProduct(id,body){
        try{
            let result = await this.collection.findByIdAndUpdate(id, {$set: body})
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

}