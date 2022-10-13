const express = require('express')
const app = express()
app.use(express.static('build'))
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())

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

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  const Contact = require('./models/contact')

  app.get('/info', (request, response) => {
    Contact.find({}).countDocuments()
      .then(count => {
        const date = new Date();
        response.send(
            `<h1>Phonebook has info for ${count} people</h1>
            <h2>${date}</h2>`
        )
        })
      .catch(error => next(error))
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
        response.status(500).send({error: 'malformatted id'})
      })
  })

  app.post('/api/contacts', (request, response, next) => {

    const body = request.body

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
      .catch(error => next(error))
  })


  app.put('/api/contacts/:id', (request, response, next) => {
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

    Contact.findByIdAndUpdate(
      id, 
      updatedContact, 
      {new:true, runValidators:true, context: 'query'}
    )
      .then(updated => {
        response.json(updated)
      })
      .catch(error => next(error))
  })

  app.delete('/api/contacts/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
  })

  const generateId = () => {
    const id = Math.floor(Math.random()*999999999)
    return id
  }



  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint)
  app.use(errorHandler)


  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })