import __dirname from "../utils.js";

import dotenv from 'dotenv'

dotenv.config()

export default{
    fileSystem:{
        baseUrl: __dirname+'/files/'
    },
    mongo:{
        baseUrl:`mongodb+srv://Fabo:Progreso22@clusterfabo.hyrfo.mongodb.net/ecommerce?retryWrites=true&w=majority`
    },
    fireBase:{
        baseUrl:"https://ecommerce-54e02.firebaseio.com"
    }
}