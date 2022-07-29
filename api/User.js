const mongoose  = require('mongoose')

mongoose.connect('mongodb+srv://admin:K1xX4ioNSPi7w17D@cluster0.ghukv.mongodb.net/miapp?retryWrites=true&w=majority')

const User = mongoose.model('User', {
    name: {type: String, required: true, minLength : 3  },
    lastname: {type: String, required: true, minLength : 3  },
    edad : Number
})

module.exports = User