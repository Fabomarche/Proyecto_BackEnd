let products;
let carts;
let chats;
let persistence = "mongo";

switch(persistence){
    case "fileSystem":
        const {default:ProductFileSystem} = await import ('./products/productFileSystem.js')
        const {default:CartFileSystem} = await import ('./carts/cartFileSystem.js')
        products = new ProductFileSystem()
        carts = new CartFileSystem()
        break
    case "mongo":
        const {default:ProductMongo} = await import ('./products/productMongo.js')
        const {default:CartMongo} = await import ('./carts/cartMongo.js')
        const {default:ChatMongo} = await import ('./chats/chatMongo.js')
        products = new ProductMongo
        carts =  new CartMongo
        chats = new ChatMongo
        break
    case "firebase":
        const {default:ProductFirebase} = await import ('./products/productFirebase.js')
        const {default:CartFirebase} = await import ('./carts/cartFirebase.js')
        products = new ProductFirebase
        carts =  new CartFirebase
        break
}

export {products, carts, chats, persistence}