import React from 'react';

const confirm = (name) => {
  return window.confirm(`Delete ${name}`);
};

const Persons = ({ personsToShow, removePerson }) => (
  <ul>
    {personsToShow.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}{' '}
        <button
          onClick={() => {
            confirm(person.name) && removePerson(person.id);
          }}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default Persons;
