import React, { useState, useEffect } from "react";
import axios from 'axios';
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  function checkEmpty(newPerson) {
    if (newPerson.name && newPerson.number) {
      return true;
    }
    return false;
  }

  function checkDuplicate(newPerson) {
    persons.some((person) => person.name === newPerson.name)
      ? alert(`${newName} already exists in your phonebook!`)
      : setPersons(persons.concat(newPerson));
  }

  //Hooks start
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);
  //Hooks end
  //Event handlers start
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length
    };

    checkEmpty(newPerson)
      ? checkDuplicate(newPerson)
      : alert(`please fill the entire form!`);
    setNewName("");
    setNewNumber("");
  };

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
          <Numbers key={person.id} name={person.name} number={person.number} />
        ))}
    </div>
  );
};

export default App;
