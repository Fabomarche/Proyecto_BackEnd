import express from 'express'
import cors from 'cors'
import upload from './services/upload.js'
import Container from './containers/Container.js'
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import { generate } from './utils.js'
import { Server } from 'socket.io'
import { chats, products } from './daos/index.js'


const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
export const io = new Server(server)

const productsContainer = new Container('products');
// const chatContainer = new Container('chat')

app.engine('handlebars', engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

const admin = true

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
        console.log(new Date().toTimeString().split(" ")[0], req.method, req.url)
        req.auth = admin
        next()
})


app.use(express.static(__dirname+'/public'))
app.use('/images', express.static(__dirname+'/public'))
app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)

app.use(upload.single('image'))



import productsRouter from './routes/products.js'
import cartsRouter from './routes/cart.js'



app.post('/api/uploadImage', upload.single('image'), (req,res) => {
    const image = req.file
    if(!image || image.length === 0){
        res.status(500).send({message:"No se subió la imagen"})
    }
    res.send(image)
})

app.get('/views/products', (req,res)=>{
    products.getAll()
    .then(result => {
        let preparedObj ={
            products : result
        }
        // console.log(preparedObj.products.payload)
        res.render('products', preparedObj)
    })
})

app.get('/api/products-test', (req,res) => {
    let fakerProducts = generate()
    res.send({state:"succes", payload:fakerProducts})
})

app.get('/views/products-test', (req,res) => {
    let preparedObj = {
        products : generate()
    }
    res.render('fakerProducts', preparedObj)
})


//-------------------- socket ----------------//
io.on('connection', async socket => {
    console.log(`the socket ${socket.id} is connected`)
    let allProducts = await products.getAll()
    
    socket.emit('deliverProducts', allProducts.payload)
    chats.getAllNormalizedChats()
    socket.emit('messagelog', await chats.getAll())

    socket.on('message', async data => {
        await chats.saveChat(data)
        io.emit('messagelog', await chats.getAll())
    })
})


//------------------ end socket ----------------//

app.use('/*', (req,res)=> res.send({
    error:-2,
    description: `Path ${req.originalUrl} and method ${req.method} aren't implemented`
}))