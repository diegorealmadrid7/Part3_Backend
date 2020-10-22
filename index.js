const express = require('express')
const { request } = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id:1,
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

const generateId = () => {
    const maxId = perosns.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body    

    if(!body.name) {
        return response.status(400).json({
            error: "content missing"
        })
    }
    const person = {
        id: generateRndId(),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})