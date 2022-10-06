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
  console.log("person ", props)
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

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button 
            type="submit"
            onClick={addName}
            >
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