const socket = io()
let user = document.getElementById('user')
let input = document.getElementById('message')
let submit = document.getElementById('submit')

//-----------Socket Events------------//
submit.addEventListener('click', () => {
    let date = new Date()
    if(input.value && user.value){
        socket.emit('message', 
            {
            user:user.value, 
            message:message.value, 
            date:date.toLocaleString()
            }
    )}else{
        console.log('message not send')
    }
})

socket.on('messagelog', data => {
    let divLog = document.getElementById('log')
    let allMessages = data.map(message => {
        return  `<div class="d-flex justify-content-center">
                    <p class="user me-1">${message.user}</p>
                    <p class="date me-2">[${message.date}]:</p>
                    <p class="message">${message.message}</p>
                </div>`
    }).join('')
    divLog.innerHTML = allMessages
})

socket.on('deliverProducts', data => {
    fetch('templates/productsTable.handlebars')
    .then(string => string.text())
    .then(template => {
        const processedTemplate = Handlebars.compile(template)
        const templateObj = {
            products:data
        }
        const html = processedTemplate(templateObj)
        let div = document.getElementById('productTable')
        div.innerHTML = html
    })
})

//-----------Fin Socket Events-----------//

const sendForm = (event) => {
    event.preventDefault()
    let form = document.querySelector('#productForm')
    let data = new FormData(form)

    fetch('/api/products', {
        method: 'POST',
        body: data,
    }).then(result => {
        return result.json()
    }).then(json => {
        console.log(json)
        return {status:"success", message:"Producto Agregado"}
    })
    .then(result => location.href='/')
}

document.addEventListener('submit', sendForm);