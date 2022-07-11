import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import NumberFilter from './NumberFilter';
import TextFilter from './TextFilter';

function TableFilters() {
  const { filter } = useContext(PlanetsContext);
  return (
    <div>
      <h2>TableFilters</h2>
      <TextFilter />
      <NumberFilter />
      {
        filter.filterByNumericValues.map(({ column, comparison, value }) => (
          <p key={ column }>{`${column} | ${comparison} | ${value}`}</p>))
      }
    </div>
  );
}

export default TableFilters;
