import React from 'react';

const Filter = ({ filter, handleFilter }) => (
  <div>
    Filter: <input value={filter} onChange={handleFilter} />
  </div>
);

export default Filter;
