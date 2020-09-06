import React from 'react';
import PropTypes from 'prop-types';

const MyDefaultButton = ({ disabled }) => (
  <button
    type="submit"
    disabled={disabled}
  >
    Submit
  </button>
);

MyDefaultButton.propTypes = {
  disabled: PropTypes.bool,
};

MyDefaultButton.defaultProps = {
  disabled: false,
};

export default MyDefaultButton;
