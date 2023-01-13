import { useEffect, useState } from "react";
import personService from "./services/persons";

const DeleteNotification = ({ message }) => {
  if (message === null) return null;

  const deleteStyle = {
    color: "red",
    fontStyle: "bold",
    fontSize: 20,
    border: "1px solid red",
    backgroundColor: "lightGrey",
    maxWidth: "10%",
  };

  return <p style={deleteStyle}>{message}</p>

}

const AddedNotification = ({ name }) => {
  if (name === null) return null;
  const successStyle = {
    color: "green",
    fontStyle: "bold",
    fontSize: 20,
    border: "1px solid green",
    backgroundColor: "lightGrey",
    maxWidth: "10%",
  };

  return <p style={successStyle}>{name} has been added.</p>;
};

const DeleteButton = ({ person, id, persons, setPersons, handleDeleteError }) => {
  const deletePerson = (id) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id, person.name).catch(error => handleDeleteError(`${person.name} has already been removed`));
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return <button onClick={() => deletePerson(person.id)}>delete</button>;
};
const Display = ({ persons, setPersons, handleDeleteError }) => {
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
            handleDeleteError={handleDeleteError}
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
  const [added, setAdd] = useState(null);
  const [deleteError, setDeleteError] = useState(null)

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

    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response));
      setAdd(response.name);
      console.log(added);

      setTimeout(() => setAdd(null), 5000);
    }).catch(error => {
      console.log(error.response.data)
      handleDeleteError(error.response.data)
    });
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumChange = (event) => setNewNum(event.target.value);

  const handleDeleteError = (message) => {
    setDeleteError(`${message}`)

    setTimeout(
      () => {
        setDeleteError(null)
      }
      , 5000)
  }

  const handleFilterNameChange = (event) =>
    updateFilterName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <AddedNotification name={added} />
      <DeleteNotification message={deleteError} />

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
        handleDeleteError={handleDeleteError}
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
