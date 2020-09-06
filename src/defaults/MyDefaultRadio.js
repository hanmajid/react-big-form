import React from 'react';
import PropTypes from 'prop-types';
import { InputPropTypes, defaultInputPropTypes } from '../my-prop-types';

const MyDefaultRadio = (props) => {
  const {
    name,
    label,
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
      {
        options.map((opt) => (
          <label
            key={`radio-opt-${name}-${opt.value}`}
            htmlFor={`radio-opt-${name}-${opt.value}`}
          >
            <input
              id={`radio-opt-${name}-${opt.value}`}
              type="radio"
              name={name}
              value={opt.value}
              disabled={disabled}
              checked={value === opt.value}
              onChange={onChange}
            />
            {opt.label}
          </label>
        ))
      }
      <span id={errorLabelId} style={{ color: 'red', display: 'block' }}>
        {error}
      </span>
    </div>
  );
};

MyDefaultRadio.propTypes = {
  ...InputPropTypes,

  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

MyDefaultRadio.defaultProps = {
  ...defaultInputPropTypes,

  options: [],
};

export default MyDefaultRadio;
