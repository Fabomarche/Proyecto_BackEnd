import express from 'express'
const router = express.Router()
import upload from '../services/upload.js'
import { io } from '../app.js'
import { authMiddleware } from '../utils.js'

import Products from '../services/Products.js'
const productsService = new Products()
//fs
import Container from '../classes/Container.js'
const productsContainer = new Container('products');
//

//GETS
router.get('/', (req, res) => {
    productsService.getAllProducts()
    .then(result => res.send(result))
})

router.get('/id?', (req, res) => {
    let pid = parseInt(req.query.id)
    productsService.getProductById(pid)
    .then(result=>{
        if(result !== null){
            res.send(result);
        } else{
            res.send({ error : 'product not finded' })
        }
    })
})

router.get('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    productsService.getProductById(id)
    .then(result=>{
        if(result !== null){
            res.send(result);
        } else{
            res.send({ error : 'product not finded' })
        }
    })
})


//POSTS
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
    let file = req.file
    let product = req.body
    product.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename
    if(!product.title || !product.price || !product.stock) {
        return res.send({
            status:'error', message:'incomplete data'
        })
    }    
    productsService.addProduct(product)
    .then(result => {
        res.send(result)
        productsService.getAllProducts().then(result => {
            io.emit('deliverProducts', result)
        })
    })
})

//PUTS
router.put('/:pid', authMiddleware, (req,res) => {
    let body = req.body;
    let id = parseInt(req.params.pid)
    productsService.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETES
router.delete('/:pid', authMiddleware, (req,res) => {
    let id = parseInt(req.params.pid)
    productsService.deleteProductById(id).then(result => {
        res.send(result)
    })
}) 


export default router