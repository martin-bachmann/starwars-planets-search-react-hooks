import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { COLUMN_LIST, COMPARISON_LIST } from '../data';
import FilterButton from './FilterButton';
import Input from './Input';
import SelectInput from './SelectInput';
import './NumberFilter.css';

const INITIAL_STATE = {
  column: COLUMN_LIST[0],
  comparison: COMPARISON_LIST[0],
  value: 0,
};

function NumberFilter() {
  const [state, setState] = useState(INITIAL_STATE);

  const { changeFilter, filter, removeAllFilters } = useContext(PlanetsContext);

  const handleChange = ({ target }) => {
    setState({
      ...state, [target.name]: target.value,
    });
  };

  const checkUsedFilters = (columnList) => {
    const { filterByNumericValues } = filter;
    return columnList.filter((columnEl) => (
      !filterByNumericValues.some((filterEl) => filterEl.column === columnEl)));
  };

  const submitFilter = (event) => {
    event.preventDefault();
    changeFilter('filterByNumericValues', [...filter.filterByNumericValues, state]);
    setState({
      column: checkUsedFilters(COLUMN_LIST).find((columnEl) => columnEl !== state.column),
      comparison: COMPARISON_LIST[0],
      value: 0,
    });
  };

  return (
    <div className="numeric-filters-wrapper">
      <form className="numeric-filter-form" onSubmit={ submitFilter }>
        <SelectInput
          name="column"
          label="Coluna"
          testid="column-filter"
          handleChange={ handleChange }
          optionList={ checkUsedFilters(COLUMN_LIST) }
        />
        <SelectInput
          name="comparison"
          label="Operador"
          testid="comparison-filter"
          handleChange={ handleChange }
          optionList={ COMPARISON_LIST }
        />
        <Input
          name="value"
          label=""
          type="number"
          value={ state.value }
          testid="value-filter"
          handleChange={ handleChange }
          labelClass="number-filter-label"
          inputClass="number-filter-input"
        />
        <button
          type="submit"
          data-testid="button-filter"
          className="numeric-filter-button"
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
          className="numeric-filter-button"
        >
          Remover filtros
        </button>
      </form>
      <div className="filter-buttons-wrapper">
        {
          filter.filterByNumericValues.map(({ column, comparison, value }) => (
            <FilterButton
              key={ column }
              column={ column }
              comparison={ comparison }
              value={ value }
            />
          ))
        }
      </div>
    </div>
  );
}

export default NumberFilter;
