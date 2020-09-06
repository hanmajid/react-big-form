import React from 'react';
import PropTypes from 'prop-types';
import { InputPropTypes, defaultInputPropTypes } from './prop-types';

const MyDefaultSelect = (props) => {
  const {
    name,
    label,
    placeholder,
    value,
    onChange,
    error,
    disabled,
    options,
  } = props;

  const errorLabelId = `error-${name}`;

  return (
    <div>
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>{placeholder || '--Select an option--'}</option>
        {
          options.map((opt) => (
            <option
              key={`select-option-${name}-${opt.value}`}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))
        }
      </select>
      <span id={errorLabelId} style={{ color: 'red', display: 'block' }}>
        {error}
      </span>
    </div>
  );
};

MyDefaultSelect.propTypes = {
  ...InputPropTypes,

  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

MyDefaultSelect.defaultProps = {
  ...defaultInputPropTypes,

  options: [],
};

export default MyDefaultSelect;
