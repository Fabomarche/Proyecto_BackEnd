import express from 'express'
const router = express.Router()
import upload from '../services/upload.js'
import { io } from '../app.js'
import { authMiddleware } from '../utils.js'
import { products, persistence } from '../daos/index.js'


// import ProductContainer from '../containers/Container.js'
// const productsContainer = new ProductContainer()

//GETS
router.get('/', async (req, res) => {
    products.getAll()
    .then(result => {
        res.send(result)
    })
})

router.get('/:pid', (req, res) => {
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.pid)
    }else{
        id = req.params.pid
    }
    products.getById(id)
    .then(result=>{
        res.send(result)
    })
})


//POSTS
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
    let file = req.file
    let product = req.body
    product.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename
    products.addProduct(product)
    .then(result => {
        res.send(result)
        products.getAll().then(result => {
            io.emit('deliverProducts', result)
        })
    })
})

//PUTS
router.put('/:pid', authMiddleware, (req,res) => {
    let body = req.body;
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.pid)
    }else{
        id = req.params.pid
    }
    products.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETES
router.delete('/:pid', authMiddleware, (req,res) => {
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.pid)
    }else{
        id = req.params.pid
    }
    products.deleteById(id).then(result => {
        res.send(result)
    })
})

router.delete('/', authMiddleware, (req,res) => {
    products.deleteAll().then(result => {
        res.send(result)
    })
})


export default router