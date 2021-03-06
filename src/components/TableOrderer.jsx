import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { COLUMN_LIST } from '../data';
import Input from './Input';
import SelectInput from './SelectInput';
import './TableOrderer.css';

const INITIAL_STATE = { column: COLUMN_LIST[0], sort: 'ASC' };

function TableOrderer() {
  const [state, setState] = useState(INITIAL_STATE);

  const { changeFilter } = useContext(PlanetsContext);

  const handleChange = ({ target }) => {
    setState({
      ...state, [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changeFilter('order', state); // Conferir essa função no provider
  };

  return (
    <form className="table-orderer-form" onSubmit={ handleSubmit }>
      <SelectInput
        name="column"
        label="Ordenar"
        testid="column-sort"
        handleChange={ handleChange }
        optionList={ COLUMN_LIST }
      />
      <div className="orderer-buttons-wrapper">
        <Input
          name="sort"
          id="ASC"
          label=" Ascendente"
          labelFirst={ false }
          type="radio"
          value="ASC"
          testid="column-sort-input-asc"
          handleChange={ handleChange }
          labelClass="orderer-radio-label"
          inputClass="orderer-radio-input"
        />
        <Input
          name="sort"
          id="DESC"
          label=" Descendente"
          labelFirst={ false }
          type="radio"
          value="DESC"
          testid="column-sort-input-desc"
          handleChange={ handleChange }
          labelClass="orderer-radio-label"
          inputClass="orderer-radio-input"
        />
      </div>
      <button
        type="submit"
        data-testid="column-sort-button"
        className="table-orderer-button"
      >
        Ordenar
      </button>
    </form>
  );
}

export default TableOrderer;
