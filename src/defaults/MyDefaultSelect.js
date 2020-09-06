import React from 'react';
import PropTypes from 'prop-types';
import { InputPropTypes, defaultInputPropTypes } from '../my-prop-types';

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
    <div style={{ marginBottom: 8 }}>
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>{placeholder || '--Select an option--'}</option>
        {
          options.map((opt) => (
            <option
              key={`select-opt-${name}-${opt.value}`}
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
