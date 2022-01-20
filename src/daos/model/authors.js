import mongoose from 'mongoose';
let Schema = mongoose.Schema;
export default class Author{
    constructor(data){
        this.data=data;
    }
    static get model(){
        return 'Authors';
    }
    static get schema(){
        return {
            
                id:{
                    type:String,
                    required:true
                },
                firstName:{
                    type:String,
                    required:true
                },
                lastName:{
                    type:String,
                    required:true
                },
                age:{
                    type:Number,
                    required:true
                },
                alias:{
                    type:String,
                    required:true
                },
                avatarUrl:{
                    type:String,
                    required:true
                }
        
    }}}