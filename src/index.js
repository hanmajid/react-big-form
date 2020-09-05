import React from 'react';
import PropTypes from 'prop-types';
import { MyInput } from './MyInput';
import ReactBigFormState from './ReactBigFormState';
import MyDefaultButton from './MyDefaultButton';

const ReactBigForm = (props) => {
  const {
    validationObject,
    onSubmit,
    forms,
    Component,
    ButtonComponent,
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
        forms.map((f) => (
          <MyInput
            key={`myInput-${f.name}`}
            ref={formRefs[f.name]}
            validationObject={validationObject}
            name={f.name}
            label={f.label}
            initialValue={f.initialValue}
            type={f.type}
            placeholder={f.placeholder}
            validationSchema={f.validationSchema}
            syncOnChange={f.syncOnChange}
            Component={Component}
            dependencyFor={f.dependencyFor}
            dependentTo={f.dependentTo}
          />
        ))
      }
        <ButtonComp />
      </form>
    </ReactBigFormState.Provider>
  );
};

export const FormFieldPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validationSchema: PropTypes.object.isRequired,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

ReactBigForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  validationObject: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  forms: PropTypes.arrayOf(PropTypes.shape(FormFieldPropTypes)),
  Component: PropTypes.elementType,
  ButtonComponent: PropTypes.elementType,
};

ReactBigForm.defaultProps = {
  forms: [],
  Component: undefined,
  ButtonComponent: undefined,
};

export default ReactBigForm;
