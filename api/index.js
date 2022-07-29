const mongoose  = require('mongoose')

mongoose.connect('mongodb+srv://admin:K1xX4ioNSPi7w17D@cluster0.ghukv.mongodb.net/miapp?retryWrites=true&w=majority')

const User = mongoose.model('User', {
    username: String,
    edad : Number
})

const crear = async () =>{
    const user = new User({ username : 'Chanchito triste', edad:25})
    const saveUser =  await user.save()
    console.log(saveUser)
}

const listarTodo = async () => {
    const users = await User.find()
    console.log(users)
}

const buscar = async () =>{
    const user = await User.find({username: 'Chanchito Feliz'})
    console.log(user)

}

const buscarUno = async () =>{
    const user = await User.findOne({username: 'Chanchito Feliz'})
    console.log(user)
}

const actualizar = async () => {
    const user = await User.findOne({username: 'Chanchito Feliz'})
    console.log(user)
    user.edad = 30
    await user.save()
}

const eliminar = async () => {
    const user = await User.findOne({username: 'Chanchito Triste'})
    console.log(user)
    if (user){
        await user.remove()
    }
}


