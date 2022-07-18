import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

function FilterButton({ column, comparison, value }) {
  const { removeFilter } = useContext(PlanetsContext);
  return (
    <div data-testid="filter">
      <p>{`${column} | ${comparison} | ${value}`}</p>
      <button type="button" onClick={ () => removeFilter(column) }>x</button>
    </div>
  );
}

FilterButton.propTypes = {
  column: PropTypes.string.isRequired,
  comparison: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FilterButton;
