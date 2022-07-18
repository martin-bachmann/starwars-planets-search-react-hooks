import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';
import './FilterButton.css';

function FilterButton({ column, comparison, value }) {
  const { removeFilter } = useContext(PlanetsContext);
  return (
    <div data-testid="filter" className="filter-button-container">
      <p className="filter-button-text">{`${column} | ${comparison} | ${value}`}</p>
      <button
        className="filter-button-remover"
        type="button"
        onClick={ () => removeFilter(column) }
      >
        <img className="remove-img" src="./2891491.png" alt="Excluir filtro" />
      </button>
    </div>
  );
}

FilterButton.propTypes = {
  column: PropTypes.string.isRequired,
  comparison: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FilterButton;
