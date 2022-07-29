const Animals = require('./animal.model')

const Animal = {
	get : async (req,res)=> {
        const { id } = req.params
        const animal = await Animals.findOne({_id : id})
        res.status(200).send(animal)
    },
	list: async (req, res) => {
		const animals = await Animals.find()
		res.status(200).send(animals)
	},
	create: async (req, res) => {
		const animal = new Animals(req.body)
		const savedAnimal =  await animal.save()
		res.status(201).send(savedAnimal._id)
	},
	update: async (req, res) => {
		const { id } = req.params
        const animal = await Animals.findOne({_id : id})
        Object.assign(animal,req.body)
        await animal.save()
        res.sendStatus(204)
	},
	destroy: async (req, res) => {
		const { id } = req.params
		const animal = await Animals.findOne({ _id: id })
		if (!animal){
			res.sendStatus(204)
		}
    	await animal.remove()
		res.sendStatus(204)
	}
}

module.exports = Animal
