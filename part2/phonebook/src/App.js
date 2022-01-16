import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/personsService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const hook = () => {
    personsService.getAll().then((response) => setPersons(response));
  };

  useEffect(hook, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const findName = (newName) => {
    return persons.find((a) => a.name === newName);
  };

  const addPerson = ({ newName, newNumber }) => {
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    console.log(newName, newNumber);
    personsService.create(newPersonObject).then((response) => {
      const newPersons = [...persons, response];
      setPersons(newPersons);
      setNotification({
        type: 'success',
        message: `Added ${response.name}`,
      });
      setTimeout(() => {
        setNotification({ type: null, message: null });
      }, 5000);
    });
  };

  const removePerson = (id) => {
    personsService
      .remove(id)
      .then((response) => {
        const newPersons = persons.filter((person) => person.id !== id);
        setPersons(newPersons);
        setNotification({
          type: 'success',
          message: 'Entry deleted',
        });
      })
      .catch((error) => {
        setNotification({
          type: 'error',
          message: 'Entry does not exist',
        });
      });
    setTimeout(() => {
      setNotification({ type: null, message: null });
    }, 5000);
  };

  const updatePerson = (person) => {
    personsService
      .update(person.id, person)
      .then((response) => {
        const newPersons = persons.map((person) =>
          response.id === person.id ? response : person
        );
      })
      .catch((error) => {
        setNotification({ type: 'error', message: 'Entry does not exist' });
      });
    setTimeout(() => {
      setNotification({ type: null, message: null });
    }, 5000);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add New</h2>
      <PersonForm
        addPerson={addPerson}
        updatePerson={updatePerson}
        findName={findName}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
