const express = require('express')
const app = express()
app.use(express.json())

const contacts = [
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

  app.delete('/api/contact/:id', (request, response) => {
    const id = Number(request.params.id)
    contact = contact.filter(contact => contact.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = contacts.length > 0
      ? Math.max(...contacts.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/contacts', (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }

      const contact = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
      } 

    contacts = contacts.concat(contact)

    response.json(contact)
  })
  
  const PORT = 3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })