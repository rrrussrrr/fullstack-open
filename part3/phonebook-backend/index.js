const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

morgan.token('data', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.data(req, res)  
    ].join(' ')
  }))

const Contact = require('./models/contact')

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }

// app.use(requestLogger)  

// let contacts = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]
app.get('/info', (request, response) => {

    Contact.find({}).countDocuments().then(count => {
        const date = new Date();
        response.send(
            `<h1>Phonebook has info for ${count} people</h1>
             <h2>${date}</h2>`
        )
    }) 
  })

app.get('/', (request, response) => {
        response.send('<h1>Hello World!</h1>')
    })
  
  app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts=> {
        response.json(contacts)
    })
  })

  app.get('/api/contacts/:id', (request, response) => {
    const id = request.params.id.trim()
    if (id.length !== 24) {
      response.statusMessage = "404 Not Found"
      return response.status(404).end()     
    }
    Contact.findById(id)
      .then(contact => {
        if(!contact) {
          return response.status(404).end()
        } else {
            response.json(contact)
        }
      })
      .catch(error => {
        console.log(error)
        response.status(500).end()
      })
  })


  app.delete('/api/contacts/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
  })

  app.put('/api/contacts/:id', (request, response) => {
    const id = request.params.id
    const body = request.body
    console.log(body)
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

    const updatedContact = {
        name: body.name,
        number: body.number,
        date: new Date(),
      } 

    Contact.findByIdAndUpdate(id, updatedContact, {new:true})
      .then(updated => {
        response.json(updated)
      })

    // // contacts = contacts.concat(contact)
    // contacts = contacts.map(contact => contact.id !== id ? contact : updatedContact)
    // // contacts = contacts.filter(contact => contact.id !== id).concat(contact)
    // response.json(updatedContact)
  })

  const generateId = () => {
    const id = Math.floor(Math.random()*999999999)
    return id
  }

  app.post('/api/contacts', (request, response) => {

    const body = request.body
    console.log(body)
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
      
    // Contact.find({name: body.name}).then(contacts=> {
    //     if (contacts.count() > 0) {
    //         return response.status(400).json({ 
    //           error: 'name must be unique' 
    //         })
    //     }
    // })
  
    Contact.find({name: body.name}).countDocuments().then(count => {
        if (count > 0) {
            return response.status(400).json({ 
            error: 'name must be unique' 
            })           
        }
    }) 

    
        


      const contact = new Contact({
        name: body.name,
        number: body.number,
        date: new Date()
      })

      contact.save().then(savedContact => {
        response.json(savedContact)
      })
  })
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })