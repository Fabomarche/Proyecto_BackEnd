import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class Message{
    constructor(data){
        this.data=data;
    }
    static get model(){
        return 'Messages';
    }
    static get schema(){
        return{
            Author:{
                type:Schema.Types.ObjectId,
                ref:'Authors',
                required:true
            },
            text:{
                type:String,
                required:true
            }
        }
    }
}