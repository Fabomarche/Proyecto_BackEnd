import { get } from "mongoose"

let form = document.getElementById('RegisterForm')
form.addEventListener('submit', function(e){
    e.preventDefault()
    let info =  new FormData(form)
    let sendObject = {
        id:info.get('id'),
        firstName:info.get('firstName'),
        lastName:info.get('lastName'),
        age:info.get('age'),
        alias:info.get('alias'),
        avatarUrl:info.get('avatarUrl')
    }
    fetch('ruta', {
        metthod:"POST",
        body:JSON.stringify(sendObject),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json())
    .then(json=>{
        form.reset()
        alert('User Register')
    })
})