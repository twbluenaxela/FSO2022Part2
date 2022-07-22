import { useState, useEffect } from "react";
import axios from 'axios'

const Persons = ({ persons, filter }) => {

  const numbersToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      {numbersToShow.map((person) => {
        return <p key={person.name}>{`${person.name} ${person.number}`}</p>;
      })}
    </div>
  );
};

const Filter = ({ setFilter }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      filter shown with <input onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  persons,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  setPersons,
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    if (newName === "") {
      return;
      /**
       * I noticed a bug where, if you enter something in the name field,
       * and then press 'add', it will add it to the persons array as expected.
       * However when you do that consecutively, the input field will still have the name still sitting
       * there. But as far as react is concerned, that value isn't there. It's blank. That is,
       * until you make a change to the name in input name field, like add a space, add a letter,
       * and so on.
       * Then, it activates the handle change function and suddenly it's not blank, but it's the value you
       * expect it to be. It's the value you can see with your eyes that is in the input name field.
       */
    }
    if (persons.some((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = { name: newName, number: newNumber };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input
            type="tel"
            onChange={handleNumberChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const gitpodBackendUrl = "https://3001-twbluenaxel-fso2022part-q6p1ytmwo86.ws-us54.gitpod.io"

  useEffect(()=>{
    console.log("loading...")
    axios.get(gitpodBackendUrl + "/persons")
    .then(response => {
      console.log('promise fulfilled', response.data)
      setPersons(response.data)
    })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h3>Add to phonebook</h3>
      <PersonForm
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  );
};

export default App;
