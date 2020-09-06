import React from 'react';
import { defaultInputPropTypes, InputPropTypes } from '../my-prop-types';

const MyDefaultCheckbox = (props) => {
  const {
    name,
    label,
    value,
    onChange,
    error,
    disabled,
  } = props;

  const errorLabelId = `error-${name}`;

  return (
    <div style={{ marginBottom: 8 }}>
      <label
        htmlFor={name}
      >
        <input
          id={name}
          type="checkbox"
          disabled={disabled}
          checked={value}
          onChange={(e) => {
            onChange({ target: { value: e.target.checked } });
          }}
        />
        {label}
      </label>
      <span id={errorLabelId} style={{ color: 'red', display: 'block' }}>
        {error}
      </span>
    </div>
  );
};

MyDefaultCheckbox.propTypes = {
  ...InputPropTypes,
};

MyDefaultCheckbox.defaultProps = {
  ...defaultInputPropTypes,
};

export default MyDefaultCheckbox;
