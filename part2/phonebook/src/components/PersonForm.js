import React, { useState } from 'react';

const PersonForm = ({ addPerson, updatePerson, findName }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const person = findName(newName);

    if (person) {
      const confirm = window.confirm(
        `${person.name} already exists. Update entry?`
      );
      confirm && updatePerson({ ...person, number: newNumber });
    } else {
      addPerson({ newName, newNumber });
    }
    setNewName('');
    setNewNumber('');
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addName}>
      <div>
        Name: <input value={newName} onChange={handleNewName} />
        <br />
        Number: <input value={newNumber} onChange={handleNewNumber} />
        <br />
        <br />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
