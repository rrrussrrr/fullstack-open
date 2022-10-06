import { useState } from 'react'
import Filter from './components/Filter'
import ContactsDisplay from './components/ContactsDisplay'


const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

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

      <h3>Add new contact</h3>
      {/* input forms */}
      <form onSubmit={addContact}>
        <div>
          name: <input 
          value={newName}
          onChange={nameInputChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={numberInputChange}
          />
        </div>
        <div>
          <button type="submit">
              add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>

      <Filter value={filterValue} onChange={filterValueChange}/>

      <ContactsDisplay contacts={filteredContacts}/>
    </div>
  )
}

export default App