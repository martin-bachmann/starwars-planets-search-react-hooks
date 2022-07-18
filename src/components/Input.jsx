import React from 'react';
import PropTypes from 'prop-types';

function Input({ name, label, id, type, value, testid, handleChange }) {
  return (
    <label htmlFor={ id || name }>
      {label}
      <input
        type={ type }
        name={ name }
        id={ id }
        value={ value }
        onChange={ handleChange }
        data-testid={ testid }
      />
    </label>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  testid: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  id: '',
  testid: '',
};

export default Input;
