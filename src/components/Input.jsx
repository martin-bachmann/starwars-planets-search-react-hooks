import React from 'react';
import PropTypes from 'prop-types';

function Input({
  name, label, labelFirst, id, type, value, testid, handleChange, labelClass, inputClass,
}) {
  return (
    <label htmlFor={ id || name } className={ `input-label ${labelClass}` }>
      {labelFirst && label}
      <input
        type={ type }
        name={ name }
        id={ id }
        value={ value }
        onChange={ handleChange }
        data-testid={ testid }
        className={ `input-input ${inputClass}` }
      />
      {!labelFirst && label}
    </label>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelFirst: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  testid: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
};

Input.defaultProps = {
  labelFirst: true,
  id: '',
  testid: '',
  labelClass: '',
  inputClass: '',
};

export default Input;
