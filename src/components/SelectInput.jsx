import React from 'react';
import PropTypes from 'prop-types';
import './SelectInput.css';

function SelectInput({ name, label, testid, handleChange, optionList }) {
  return (
    <label htmlFor={ name } className="select-label">
      {label}
      <select
        data-testid={ testid }
        onChange={ handleChange }
        name={ name }
        id={ name }
      >
        { optionList.map((option, i) => (
          <option
            key={ option }
            value={ option }
            defaultValue={ i === 0 }
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  optionList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectInput;
