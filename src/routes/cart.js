import express from 'express'
const router = express.Router()
import { carts, persistence } from '../daos/index.js'

// import CartContainer from '../containers/CartContainer.js'
// const cartsContainer = new CartContainer()


//POSTS
router.post('/', (req, res) => {
    carts.createCart()
    .then(result => res.send(result))
    console.log()
})

router.post('/:cid/products', (req, res) => {
    let cartId;
    let productId;
    if(persistence === "fileSystem"){
        cartId = parseInt(req.params.cid)
        productId = parseInt(req.body.id)
    }else{
        cartId = req.params.cid
        productId = req.body.id
    }
    carts.addProduct(cartId, productId)
    .then(result => res.send(result))
})

//DELETES
router.delete('/:cid', (req, res) => {
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.cid)
    }else{
        id = req.params.cid
    }
    carts.deleteById(id)
    .then(result => res.send(result))
})

router.delete('/:cid/products/:pid', (req, res) => {
    let cartId;
    let productId;
    if(persistence === "fileSystem"){
        cartId = parseInt(req.params.cid)
        productId = parseInt(req.params.pid)
    }else{
        cartId = req.params.cid
        productId = req.params.pid
    }
    carts.deleteProduct(cartId, productId)
    .then(result => res.send(result))
})


//GETS
router.get('/:cid/products', (req, res) => {
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.cid)
        
    }else{
        id = req.params.cid
    }
    carts.getProductsByCartId(id)
    .then(result => res.send(result))
})

router.get('/', (req,res)=>{
    carts.getAll().then(result=>{
        res.send(result)
    })
})


export default router