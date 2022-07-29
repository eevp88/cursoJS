const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Animal = require('./animal.controller')
const {Auth, isAutenticated} = require('./auth.controller')
const port = 3000

mongoose.connect('mongodb+srv://admin:K1xX4ioNSPi7w17D@cluster0.ghukv.mongodb.net/miapp?retryWrites=true&w=majority')

app.use(express.json())

app.get('/animals', isAutenticated, Animal.list)
app.post('/animals', isAutenticated, Animal.create)
app.put('/animals/:id', isAutenticated, Animal.update)
app.patch('/animals/:id', isAutenticated, Animal.update)
app.delete('/animals/:id', isAutenticated, Animal.destroy)

app.post('/login', Auth.login)
app.post('/register', Auth.register)

app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})

app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
