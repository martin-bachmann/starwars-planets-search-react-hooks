import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { COLUMN_LIST, COMPARISON_LIST } from '../data';
import FilterButton from './FilterButton';
import Input from './Input';
import SelectInput from './SelectInput';

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
    return columnList.reduce((acc, columnEl) => (
      filterByNumericValues.some((filterEl) => filterEl.column === columnEl)
        ? acc : [...acc, columnEl]), []);
  };

  const submitFilter = (event) => {
    event.preventDefault();
    changeFilter('filterByNumericValues', [...filter.filterByNumericValues, state]);
    setState(INITIAL_STATE);
  };

  return (
    <form onSubmit={ submitFilter }>
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
      />
      <button
        type="submit"
        data-testid="button-filter"
      >
        Filtrar
      </button>
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
