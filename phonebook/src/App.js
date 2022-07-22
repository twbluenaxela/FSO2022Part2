import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = { name: newName, number: newNumber };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("")
    }
  };

  const numbersToShow = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} />
      </div>
      <h2>Add to phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input type="tel" onChange={handleNumberChange}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numbersToShow.map((person) => {
        return <p key={person.name}>{`${person.name} ${person.number}`}</p>;
      })}
    </div>
  );
};

export default App;
