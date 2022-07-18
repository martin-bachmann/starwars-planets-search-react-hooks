import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Input from './Input';

function TextFilter() {
  const { changeFilter, filter } = useContext(PlanetsContext);
  return (
    <div>
      <Input
        name="textSearch"
        label="Digite o nome do planeta: "
        type="text"
        value={ filter.filterByName.name }
        testid="name-filter"
        handleChange={
          ({ target }) => changeFilter('filterByName', { name: target.value })
        }
      />
    </div>
  );
}

export default TextFilter;
