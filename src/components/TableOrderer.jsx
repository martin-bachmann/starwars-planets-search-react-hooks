import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { COLUMN_LIST } from '../data';

function TableOrderer() {
  const INITIAL_STATE = { column: COLUMN_LIST[0], sort: 'ASC' };

  const { changeOrder } = useContext(PlanetsContext);

  const [state, setState] = useState(INITIAL_STATE);

  const handleChange = ({ target }) => {
    setState({
      ...state, [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changeOrder(state);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h3>TableOrderer</h3>
      <label htmlFor="column">
        orderer
        <select
          onChange={ handleChange }
          name="column"
          id="column"
          data-testid="column-sort"
        >
          { COLUMN_LIST.map((columnElement) => (
            <option
              // name={ columnElement }
              key={ columnElement }
            >
              {columnElement}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="ASC">
        ascendente
        <input
          type="radio"
          id="ASC"
          value="ASC"
          name="sort"
          data-testid="column-sort-input-asc"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="DESC">
        descendente
        <input
          type="radio"
          id="DESC"
          value="DESC"
          name="sort"
          data-testid="column-sort-input-desc"
          onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </form>
  );
}

export default TableOrderer;
