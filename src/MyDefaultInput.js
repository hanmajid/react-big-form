import React from 'react';
import PropTypes from 'prop-types';

const MyDefaultInput = (props) => {
  const {
    name,
    label,
    placeholder,
    type,
    value,
    onChange,
    error,
  } = props;

  const errorLabelId = `error-${name}`;

  return (
    <div>
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorLabelId}
      />
      <span id={errorLabelId} style={{ color: 'red', display: 'block' }}>
        {error}
      </span>
    </div>
  );
};

MyDefaultInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

MyDefaultInput.defaultProps = {
  placeholder: '',
  type: 'text',
};

export default MyDefaultInput;
