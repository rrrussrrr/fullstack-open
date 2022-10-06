import { useState } from 'react'

const PersonsDisplay = ({persons}) => {
  return (
    <ul>
    {persons.map(person => 
      <Person key={person.name} name={person.name}/>
    )}
    </ul>
  )
}

const Person = (props) => {
  return (
  <li>
    {props.name}
  </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    
    if (persons.filter(person => person.name === newName).length > 0) {
      alert("Name already exists")
    } 
    else {

      const nameObject = {
        name: newName,
        // date: new Date().toISOString()
      }
  
      setPersons(persons.concat(nameObject));
      setNewName('')
    }
  }

  const nameInputChange = (e) => {
    setNewName(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={nameInputChange}
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