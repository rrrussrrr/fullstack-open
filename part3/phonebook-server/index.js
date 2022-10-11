const express = require('express')
const app = express()
app.use(express.json())

let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/info', (request, response) => {
    const length = contacts.length;
    const date = new Date();
    response.send(
        `<h1>Phonebook has info for ${length} people</h1>
         <h2>${date}</h2>`
    )
  })

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/contacts', (request, response) => {
    response.json(contacts)
  })

  app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const contact = contacts.find(contact => contact.id === id)

    if(!contact) {
        response.statusMessage = "404 Not Found"
        response.status(404).end()
    } else {
        response.json(contact)
    }
  })

  app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const id = Math.floor(Math.random()*999999999)
    return id
  }

  app.post('/api/contacts', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      }

      if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }

      if (contacts.find(contact => contact.name === body.name)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }

      const contact = {
        id: generateId(),
        name: body.name,
        number: body.number,
        date: new Date(),
      } 

    contacts = contacts.concat(contact)

    response.json(contact)
  })
  
  const PORT = 3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })