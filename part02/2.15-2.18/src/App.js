import React, { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./service/people";

const App = () => {
  function checkEmpty(newPerson) {
    if (newPerson.name && newPerson.number) {
      return true;
    }
    return false;
  }

  function editPerson(newPerson) {
    if (persons.some((person) => person.name === newPerson.name)) {
      if (window.confirm(`Doing this will change de entry for ${newPerson.name}. Are you sure you want to proceed?`)) {
        const person = persons.find((p) => p.name === newPerson.name);
        const changeNumber = { ...person, number: newPerson.number };

        personService
          .changePerson(person.id, changeNumber)
          .then((changedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== changedPerson.name ? person : changedPerson
              )
            );
          });
        }
    } else {
      personService.addPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
  }

  //Hooks start
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.allPeople().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);
  //Hooks end

  //Event handlers start
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    checkEmpty(newPerson)
      ? editPerson(newPerson)
      : alert(`please fill the entire form!`);

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    if (window.confirm(`Do you really want to delete this entry?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  //Event handlers end

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={handleFilterChange} />
      <br />
      <h3>Add a new person</h3>
      <PersonForm
        addNewPerson={addPerson}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <br />
      <h3>Numbers</h3>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <Numbers 
            key={person.id}
            name={person.name} 
            number={person.number} 
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
    </div>
  );
};

export default App;
