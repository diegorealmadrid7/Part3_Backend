const express = require('express')
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
    }
]

const date = () => {
    return new Date()
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

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})