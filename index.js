require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())

morgan.token("body", function (req,res){
    return JSON.stringify({
        body: req.body
    })
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let persons = [
    {
        id: 1,
        name:"Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Diego Rojas",
        number: "1161394793"
    },
    {
        id: 5,
        name: "aaaaaa",
        number: "reeeee"
    }
]

const date = () => {
    return new Date()
}

const generateRndId = () => {
    const min = Math.ceil(Math.max(...persons.map(p => p.id)))
    const max = Math.floor(100)            
    return Math.floor(Math.random() * (max - min) + min)
}

app.get('/', (request, response) => {
    const text = persons.length > 0
    ?   `Phonebook has info for ${persons.length} people`
    : `Phonebook has info por 0 people`
    const fecha = date()
    response.send(`${text} </br> </br> ${fecha}`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (persons.find(p => p.name === request.body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    if(!body.name) {
        return response.status(400).json({
            error: "name is missing"
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error: "number is missing"
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})