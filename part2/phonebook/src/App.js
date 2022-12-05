import { useEffect, useState } from 'react'
import axios from 'axios'

const Display = ({ persons }) => <ul>{persons.map(person => <li key={person.name.concat(Math.random())}>{person.name} {person.number}</li>)}</ul>
const Filter = ({ filterName, handleFilterNameChange }) => <div>filter shown with: <input value={filterName} onChange={handleFilterNameChange} /></div>
const Form = ({ handleForm, newName, handleNameChange, newNum, handleNumChange }) => {
  return (
    <form onSubmit={handleForm}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br />
        number: <input value={newNum} onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, updateFilterName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    }).catch(error => console.log(error))
  },[])
  const handleForm = (event) => {
    event.preventDefault()

    for (let person in persons) {
      if (persons[person].name === newName) {
        return alert(`${newName} already added to the phonebook`)
      }
    }

    setPersons(persons.concat({ name: newName, number: newNum }))
  }

  const handleNameChange = (event) => setNewName(event.target.value)


  const handleNumChange = (event) => setNewNum(event.target.value)

  const handleFilterNameChange = (event) => updateFilterName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      <h2>add a new</h2>
      <Form handleForm={handleForm} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Display persons={filterName === "" ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()))} />
    </div>
  )
}

export default App