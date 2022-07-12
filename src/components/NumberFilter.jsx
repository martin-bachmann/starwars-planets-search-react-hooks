import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { COLUMN_LIST, COMPARISON_LIST } from '../data';

function NumberFilter() {
  const INITIAL_STATE = {
    column: COLUMN_LIST[0],
    comparison: COMPARISON_LIST[0],
    value: 0,
  };

  const {
    changeFilterByNumber, filter, removeFilter, removeAllFilters,
  } = useContext(PlanetsContext);
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
      <h3>NumberFilter</h3>
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
      {
        filter.filterByNumericValues.map(({ column, comparison, value }) => (
          <div key={ column } data-testid="filter">
            <p>{`${column} | ${comparison} | ${value}`}</p>
            <button type="button" onClick={ () => removeFilter(column) }>x</button>
          </div>
        ))
      }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover filtros
      </button>
    </form>
  );
}

export default NumberFilter;
