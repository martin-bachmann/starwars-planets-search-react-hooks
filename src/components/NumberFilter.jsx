import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumberFilter() {
  const COLUMN_LIST = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const COMPARISON_LIST = ['maior que', 'menor que', 'igual a'];
  const [state, setState] = useState({
    column: COLUMN_LIST[0],
    comparison: COMPARISON_LIST[0],
    value: 0,
  });

  const { changeFilterByNumber } = useContext(PlanetsContext);

  const handleChange = ({ target }) => setState({
    ...state, [target.name]: target.value,
  });

  const submitFilter = (event) => {
    event.preventDefault();
    console.log(state);
    changeFilterByNumber(state);
  };

  return (
    <form onSubmit={ submitFilter }>
      <h2>NumberFilter</h2>
      <label htmlFor="column">
        column
        <select
          data-testid="column-filter"
          onChange={ handleChange }
          name="column"
          id="column"
        >
          { COLUMN_LIST.map((columnElement, i) => (
            <option
              name={ columnElement }
              key={ columnElement }
              value={ columnElement }
              selected={ i === 0 }
            >
              {columnElement}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        comparison
        <select
          data-testid="comparison-filter"
          onChange={ handleChange }
          name="comparison"
          id="comparison"
        >
          { COMPARISON_LIST.map((comparisonElement, i) => (
            <option
              key={ comparisonElement }
              value={ comparisonElement }
              selected={ i === 0 }
            >
              {comparisonElement}
            </option>
          ))}
          {' '}

        </select>
      </label>
      <label htmlFor="value">
        <input
          type="number"
          name="value"
          id="value"
          value={ state.value }
          onChange={ handleChange }
          data-testid="value-filter"
        />
      </label>
      <button
        type="submit"
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}

export default NumberFilter;
