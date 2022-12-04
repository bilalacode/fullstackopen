import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, updateFilterName] = useState('')
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