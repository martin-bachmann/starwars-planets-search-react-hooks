import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumberFilter() {
  const COLUMN_LIST = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const COMPARISON_LIST = ['maior que', 'menor que', 'igual a'];
  const INITIAL_STATE = {
    column: COLUMN_LIST[0],
    comparison: COMPARISON_LIST[0],
    value: 0,
  };

  const { changeFilterByNumber, filter } = useContext(PlanetsContext);
  const { filterByNumericValues } = filter;

  const [state, setState] = useState(INITIAL_STATE);

  const handleChange = ({ target }) => {
    setState({
      ...state, [target.name]: target.value,
    });
  };

  const submitFilter = (event) => {
    event.preventDefault();
    changeFilterByNumber(state);
    setState(INITIAL_STATE);
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
          { COLUMN_LIST.reduce((acc, columnElement) => (filterByNumericValues
            .some((filterEl) => filterEl.column === columnElement) ? acc : [...acc, (
              <option
                name={ columnElement }
                key={ columnElement }
              >
                {columnElement}
              </option>
            )]), [])}
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
