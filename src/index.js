import React from 'react';
import PropTypes from 'prop-types';
import { MyInput } from './MyInput';
import ReactBigFormState from './ReactBigFormState';
import MyDefaultButton from './MyDefaultButton';
import { FormFieldPropTypes } from './prop-types';

const ReactBigForm = (props) => {
  const {
    validationObject,
    onSubmit,
    forms,
    Component,
    ButtonComponent,
    buttonDisabled,
  } = props;

  const [formRefs, setFormRefs] = React.useState({});

  React.useEffect(() => {
    const refs = {};
    forms.forEach((f) => {
      refs[f.name] = React.createRef();
    });
    setFormRefs(refs);
  }, [forms]);

  const [values, setValues] = React.useReducer((oldValues, { type, value, key }) => {
    switch (type) {
      case 'updateUnsync': {
        const { dependencyFor, ...restValue } = value;
        const newValues = {
          ...oldValues,
          [key]: restValue,
        };
        dependencyFor.forEach((df) => {
          delete newValues[df];
        });
        return newValues;
      }
      case 'update':
        return {
          ...oldValues,
          [key]: value,
        };
      case 'updateAll':
        return value;
      default:
        return oldValues;
    }
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = false;
    const newValues = {};
    forms.forEach((f) => {
      let val;
      const ref = formRefs[f.name];
      const isInValues = f.name in values;
      if (isInValues && ref.current.isSynced()) {
        val = values[f.name];
      } else {
        const checkTouched = isInValues || f.dependentTo === undefined;
        val = ref.current.getValue(checkTouched);
      }
      if (val.error !== '') {
        isError = true;
      }
      newValues[f.name] = val;
    });
    setValues({
      type: 'updateAll',
      value: newValues,
    });
    if (!isError) {
      const finalValues = {};
      Object.entries(newValues).forEach(([key, v]) => {
        finalValues[key] = v.value;
      });
      onSubmit(finalValues);
    }
  };

  const ButtonComp = ButtonComponent || MyDefaultButton;

  return (
    <ReactBigFormState.Provider
      value={{
        state: values,
        dispatch: setValues,
      }}
    >
      <form onSubmit={handleSubmit}>
        {
        forms.map((f) => {
          const {
            name,
            label,
            initialValue,
            type,
            placeholder,
            validationSchema,
            syncOnChange,
            dependencyFor,
            dependentTo,
            disabled,
            ...restF
          } = f;
          return (
            <MyInput
              key={`myInput-${name}`}
              ref={formRefs[name]}
              validationObject={validationObject}
              name={name}
              label={label}
              initialValue={initialValue}
              type={type}
              placeholder={placeholder}
              validationSchema={validationSchema}
              syncOnChange={syncOnChange}
              Component={Component}
              dependencyFor={dependencyFor}
              dependentTo={dependentTo}
              disabled={disabled}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...restF}
            />
          );
        })
      }
        <ButtonComp disabled={buttonDisabled} />
      </form>
    </ReactBigFormState.Provider>
  );
};

ReactBigForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  validationObject: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,

  forms: PropTypes.arrayOf(PropTypes.shape(FormFieldPropTypes)),
  Component: PropTypes.elementType,
  ButtonComponent: PropTypes.elementType,
  buttonDisabled: PropTypes.bool,
};

ReactBigForm.defaultProps = {
  forms: [],
  Component: undefined,
  ButtonComponent: undefined,
  buttonDisabled: false,
};

export default ReactBigForm;
