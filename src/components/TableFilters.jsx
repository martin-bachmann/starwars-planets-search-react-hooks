import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import NumberFilter from './NumberFilter';
import TextFilter from './TextFilter';

function TableFilters() {
  const { filter, removeFilter, removeAllFilters } = useContext(PlanetsContext);
  return (
    <div>
      <h2>TableFilters</h2>
      <TextFilter />
      <NumberFilter />
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
    </div>
  );
}

export default TableFilters;
