import { useState } from 'react'

const PersonsDisplay = ({persons}) => {
  return (
    <ul>
    {persons.map(person => 
      <Person key={person.name} name={person.name} number={person.number}/>
    )}
    </ul>
  )
}

const Person = (props) => {
  return (
  <li>
    {props.name} {props.number}
  </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } 
    else {

      const nameObject = {
        name: newName,
        number: newNumber
        // date: new Date().toISOString()
      }
  
      setPersons(persons.concat(nameObject));
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
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
      <PersonsDisplay persons={persons}/>
    </div>
  )
}

export default App