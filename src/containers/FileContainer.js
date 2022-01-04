import fs from 'fs'
import config from '../config/config.js'
export default class FileContainer{
    constructor(file_endpoint){
        this.url = `${config.fileSystem.baseUrl}${file_endpoint}`
    }

    getAll = async() => {
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let ObjList =  JSON.parse(data)
            return {status:"success", payload:ObjList}
        }
        catch(err){
            return{status:"error", error:`Can't get Objects List on ${this.url} - ${err}`}
        }
    }

    async getById(idNumber){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let ObjList =  JSON.parse(data)
            
            let searchedObj = ObjList.find(prod => prod.id === idNumber)
            
            if(searchedObj){
                return {status:"success", payload: searchedObj}
            }else{
                console.log(null)
                return {status:"error", error: 'Object not found'}
            }
            
        }
        catch(err){
            return{status:"error", error:`Can't get entity with id:${id} on ${this.url} - ${err}`}
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.url, [])
            return{status:"success", mesagge:`all objects deleted on ${this.url}`}
        }
        catch(err){
            return{status:"error", mesagge:`can't all objects deleted on ${this.url} - ${err}`}
        }
    }

    async deleteById(idNumber){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let objList =  JSON.parse(data)
            
            let index = objList.findIndex(prod => prod.id === idNumber)
            let deletedObj = objList.find(prod => prod.id === idNumber)

            if(index > -1){
                objList.splice(index, 1)
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(objList, null, 2))
                    console.log(`${deletedObj.title} was deleted`)
                    return {status:"success",message:`${deletedObj.title} was deleted`}
                }
                catch(err){
                    return {status:"error",message:`${deletedObj.title} wasn't deleted`}
                }
            }else{
                return {status:"error", message:"Error: object with that id dosen't exist"}
            }
            
        }
        catch(err){
            console.log(err)
            return {status:"error", message:"error to delete object - "+err}
        }
    }
}