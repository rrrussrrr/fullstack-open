import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ContactsDisplay from './components/ContactsDisplay'
import NewContactForm from './components/NewContactForm'




const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/contacts')
      .then(response => {
        console.log('promise fulfilled')
        setContacts(response.data)
      })
  }
  
  useEffect(hook, [])

  const addContact = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    
    if (contacts.filter(contact => contact.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } 
    else {

      const nameObject = {
        name: newName,
        number: newNumber
        // date: new Date().toISOString()
      }
  
      setContacts(contacts.concat(nameObject));
      setNewName('')
      setNewNumber('')
    }
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
        newNname={newName} 
        nameInputChange={nameInputChange}
        newNumber={newNumber}
        numberInputChange={numberInputChange}
      />
      <h2>Numbers</h2>
      <Filter value={filterValue} onChange={filterValueChange}/>

      <ContactsDisplay contacts={filteredContacts}/>
    </div>
  )
}

export default App