import PropTypes from 'prop-types';

export const FormFieldPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validationSchema: PropTypes.object.isRequired,

  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  syncOnChange: PropTypes.bool,
  dependencyFor: PropTypes.arrayOf(PropTypes.string),
  dependentTo: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
};

export const defaultFormFieldProps = {
  initialValue: '',
  placeholder: '',
  type: 'text',
  syncOnChange: false,
  dependencyFor: [],
  dependentTo: [],
  disabled: false,
};

export const InputPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export const defaultInputPropTypes = {
  placeholder: '',
  type: 'text',
  disabled: false,
};
