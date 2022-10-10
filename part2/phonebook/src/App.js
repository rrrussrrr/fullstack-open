import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ContactsDisplay from './components/ContactsDisplay'
import NewContactForm from './components/NewContactForm'
import contactService from './services/contacts'




const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const modifyContactNumber = (id) => {
    const nameObject = {
      name: newName,
      number: newNumber
    }

    contactService
    .update(id, nameObject)
    .then(returnedContact => {
      setContacts(contacts.map(contact => contact.id !== id ? contact : returnedContact));
      setNewName('')
      setNewNumber('')
    })
  }
  

  const addContact = (e) => {
    e.preventDefault()
    const sameName = contacts.filter(contact => contact.name === newName)
    if (sameName.length > 0) {
      const oldContact = sameName[0];
      if (window.confirm(`${oldContact.name} is already added to phonebook, replace the old number with a new one?`)) {
        modifyContactNumber(oldContact.id)
      }
    } 
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      console.log(nameObject)
      contactService
      .create(nameObject)
      .then(returnedContact => {
        console.log(returnedContact)
        setContacts(contacts.concat(returnedContact));
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteContactByID = id => {
    const contact = contacts.find(n => n.id === id)

    contactService
    .deleteItem(id)
    .then(returned => {
      setContacts(contacts.filter(n => n.id !==id))
    })
}

  const nameInputChange = (e) => {
    setNewName(e.target.value)
  }

  const numberInputChange = (e) => {
    setNewNumber(e.target.value)
  }

  const filterValueChange = (e) => {
    setFilterValue(e.target.value)
  }

  const filteredContacts = contacts.filter(contact => 
    contact.name.includes(filterValue)
  )
  return (
    
    <div>
      <h2>Phonebook</h2>


      {/* input forms */}
      <NewContactForm 
        onSubmit={addContact} 
        newName={newName} 
        nameInputChange={nameInputChange}
        newNumber={newNumber}
        numberInputChange={numberInputChange}
      />
      <h2>Numbers</h2>
      <Filter value={filterValue} onChange={filterValueChange}/>

      <ContactsDisplay contacts={filteredContacts} deleteContactByID={deleteContactByID}/>
    </div>
  )
}

export default App