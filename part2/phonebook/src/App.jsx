import { useEffect, useState } from "react";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { Filter } from "./Filter";
import axios from "axios";
import phoneService from "./services/phonebook";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phoneService.getAll().then((data) => setPersons(data));
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
      const replace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );
      if (!replace) {
        return;
      }

      const personToUpdate = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      );

      const updatedPerson = { ...personToUpdate, number: newNumber };

      phoneService
        .update(personToUpdate.id, updatedPerson)
        .then((data) => {
          console.log(data, "Updated person data");
          setPersons(
            persons.map((person) =>
              person.id === personToUpdate.id ? data : person,
            ),
          );
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${personToUpdate.name} has already been removed from server`,
          );
          setPersons(persons.filter((n) => n.id !== personToUpdate.id));
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });

      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    phoneService
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error(error.response.data.error, "AGGGA");
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const canDelete = window.confirm(
      "Are you sure you want to delete this person?",
    );

    if (!canDelete) {
      return;
    }

    phoneService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Notification message={successMessage} className="success" />
        <Notification message={errorMessage} className="error" />
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
      <Persons filtered={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
