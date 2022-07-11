import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TextFilter() {
  const { changeFilterByText } = useContext(PlanetsContext);
  return (
    <div>
      <h3>TextFilter</h3>
      <input type="text" onChange={ changeFilterByText } data-testid="name-filter" />
    </div>
  );
}

export default TextFilter;
