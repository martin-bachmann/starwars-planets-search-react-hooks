import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Input from './Input';
import './TextFilter.css';

function TextFilter() {
  const { changeFilter, filter } = useContext(PlanetsContext);
  return (
    <Input
      name="textSearch"
      label="Digite o nome do planeta: "
      type="text"
      value={ filter.filterByName.name }
      testid="name-filter"
      handleChange={
        ({ target }) => changeFilter('filterByName', { name: target.value })
      }
      labelClass="text-filter-label"
      inputClass="text-filter-input"
    />
  );
}

export default TextFilter;
