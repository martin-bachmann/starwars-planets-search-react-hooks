import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TextFilter() {
  const { filterByName } = useContext(PlanetsContext);
  return (
    <div>
      <h2>TextFilter</h2>
      <input type="text" onChange={ filterByName } data-testid="name-filter" />
    </div>
  );
}

export default TextFilter;
