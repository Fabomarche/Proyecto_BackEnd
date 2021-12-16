import express from 'express'
import cors from 'cors'
import upload from './services/upload.js'
import Container from './classes/Container.js'//fs
import Products from './services/Products.js' //mariadb
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
export const io = new Server(server)

const productsService = new Products()// mariadb
const productsContainer = new Container('products');//fs
const chatContainer = new Container('chat')

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
    productsService.getAllProducts()
    .then(result => {
        let preparedObj ={
            products : result
        }
        res.render('products', preparedObj)
    })
})

//--------- socket ----------------//
io.on('connection', async socket => {
    console.log(`the socket ${socket.id} is connected`)
    let products = await productsService.getAllProducts()
    socket.emit('deliverProducts', products)
    
    socket.emit('messagelog', await chatContainer.getAll())

    socket.on('message', async data => {
        console.log(data)
        await chatContainer.saveChat(data)
        io.emit('messagelog', await chatContainer.getAll())
        
    })
})
//--------- end socket ----------------//

app.use('/*', (req,res)=> res.send({
    error:-2,
    description: `Path ${req.originalUrl} and method ${req.method} aren't implemented`
}))