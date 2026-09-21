import { useEffect, useState } from "react";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { Filter } from "./Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((data) => setPersons(data.data));
  }, []);

  const filtered = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
      )
    : persons;

  console.log(persons);
  console.log(filtered);

  const handleOnChange = (event) => {
    setNewName(event.target.value);
  };

  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const exist = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    console.log(exist);

    if (exist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter search={search} handleSearch={handleSearch} />
      </div>
      <h2>Add new</h2>
      <PersonForm
        handleOnChange={handleOnChange}
        handleOnChangeNumber={handleOnChangeNumber}
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} />
    </div>
  );
};

export default App;
