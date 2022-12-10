import { useEffect, useState } from "react";
import personService from "./services/persons";

const DeleteButton = ({ person, id, persons, setPersons }) => {
  const deletePerson = (id) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return <button onClick={() => deletePerson(person.id)}>delete</button>;
};
const Display = ({ persons, setPersons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <DeleteButton
            person={person}
            id={persons.id}
            persons={persons}
            setPersons={setPersons}
          />
        </li>
      ))}
    </ul>
  );
};
const Filter = ({ filterName, handleFilterNameChange }) => (
  <div>
    filter shown with:{" "}
    <input value={filterName} onChange={handleFilterNameChange} />
  </div>
);
const Form = ({
  handleForm,
  newName,
  handleNameChange,
  newNum,
  handleNumChange,
}) => {
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
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterName, updateFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);
  const handleForm = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNum };
    for (let person in persons) {
      if (
        persons[person].name === newName &&
        persons[person].number === newNum
      ) {
        return alert(
          `${persons[person].name} is already added with ${persons[person].number}`
        );
      } else if (
        persons[person].name === newName &&
        persons[person].number !== newNum
      ) {
        if (
          window.confirm(
            `${persons[person].name} is already in the list. Update number?`
          )
        ) {
          const per = persons.find((n) => n.id === persons[person].id);
          const changedPerson = { ...per, number: newNum };
          return personService
            .update(persons[person].id, changedPerson)
            .then((res) => {
              setPersons(
                persons.map((x) =>
                  x.id !== changedPerson.id ? x : changedPerson
                )
              );
            });
        }
      }
    }

    personService
      .create(newPerson)
      .then((response) => setPersons(persons.concat(response)));
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumChange = (event) => setNewNum(event.target.value);

  const handleFilterNameChange = (event) =>
    updateFilterName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
      />
      <h2>add a new</h2>
      <Form
        handleForm={handleForm}
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Display
        setPersons={setPersons}
        persons={
          filterName === ""
            ? persons
            : persons.filter((person) =>
                person.name
                  .toLocaleLowerCase()
                  .includes(filterName.toLocaleLowerCase())
              )
        }
      />
    </div>
  );
};

export default App;
