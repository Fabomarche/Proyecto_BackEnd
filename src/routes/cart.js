import express from 'express'
const router = express.Router()

import CartContainer from '../classes/CartContainer.js'
const cartsContainer = new CartContainer()


//POSTS
router.post('/', (req, res) => {
    cartsContainer.createCart()
    .then(result => res.send(result))
    console.log()
})

router.post('/:cid/products', (req, res) => {
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.body.id)
    cartsContainer.addProduct(cartId, productId)
    .then(result => res.send(result))
})

//DELETES
router.delete('/:cid', (req, res) => {
    let id = parseInt(req.params.cid)
    cartsContainer.deleteById(id)
    .then(result => res.send(result))
})

router.delete('/:cid/products/:pid', (req, res) => {
    let cartId = parseInt(req.params.cid)
    let prodId = parseInt(req.params.pid)
    cartsContainer.deleteProduct(cartId, prodId)
    .then(result => res.send(result))
})


//GETS
router.get('/:cid/products', (req, res) => {
    let id = parseInt(req.params.cid)
    cartsContainer.getProductsByCartId(id)
    .then(result => res.send(result))
})


export default router