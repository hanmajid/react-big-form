import React from 'react';
import { defaultInputPropTypes, InputPropTypes } from '../my-prop-types';

const MyDefaultInputFile = (props) => {
  const {
    name,
    label,
    onChange,
    error,
    disabled,
  } = props;

  const errorLabelId = `error-${name}`;

  return (
    <div style={{ marginBottom: 8 }}>
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            onChange({ target: { value: e.target.files[0] } });
          }
        }}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorLabelId}
      />
      <span id={errorLabelId} style={{ color: 'red', display: 'block' }}>
        {error}
      </span>
    </div>
  );
};

MyDefaultInputFile.propTypes = {
  ...InputPropTypes,
};

MyDefaultInputFile.defaultProps = {
  ...defaultInputPropTypes,
};

export default MyDefaultInputFile;
