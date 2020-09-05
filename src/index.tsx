import * as React from 'react'
import {MixedSchema, object} from 'yup';

const { forwardRef } = React

const MyInput: React.FC<{
  ref: any
  name: string
  label: string
  initialValue?: string
  type?: string
  placeholder?: string
  validationSchema: MixedSchema
  onValidationChange: Function
  Component?: React.ElementType
}> = forwardRef((props, ref) => {
  const {
    name,
    label,
    initialValue = '',
    type = 'text',
    placeholder,
    validationSchema,
    onValidationChange,
    Component,
  } = props;

  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState('');
  const yupSchema = object().shape({
    [name]: validationSchema,
  });

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setValue(newValue);

    let newError = '';
    yupSchema.validate({ [name]: newValue })
      .then(() => {
        setError('');
      })
      .catch((e) => {
        newError = e.message;
        setError(newError);
      })
      .finally(() => {
        onValidationChange({
          name,
          value,
          error: newError,
        });
      });
  };

  React.useImperativeHandle(ref, () => ({
    getValue() {
      console.log('getValue');
      let newError = '';
      try {
        yupSchema.validateSync({ [name]: value });
        newError = '';
      } catch (e) {
        console.log(e);
        newError = e.message;
      }
      setError(newError);
      return { name, value, error: newError };
    },
  }));

  const errorLabelId = `error-${name}`;

  return (
    <>
      {
        Component === undefined ? (
          <div>
            <label htmlFor={name}>
              {label}
            </label>
            <input
              name={name}
              placeholder={placeholder}
              type={type}
              value={value}
              onChange={handleChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={errorLabelId}
            />
            <strong id={errorLabelId}>
              {error}
            </strong>
          </div>
        ) : (
          <Component
            name={name}
            label={label}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={handleChange}
            error={error}
          />
        )
      }
    </>
  );
});

type FormProps = {
  name: string
  label: string
  initialValue: string
  type: string
  placeholder: string
  validationSchema: MixedSchema
  onValidationChange: Function
  Component: React.ElementType
}

type ReducerAction = {
  type: string
  key: string
  value: any
}

type FormValueError = {
  name: string
  value: string
  error: string
}

const ReactBigForm: React.FC<{
  onSubmit: Function
  forms: Array<FormProps>
  Component: React.ElementType
}> = (props) => {
  const {
    onSubmit,
    forms,
    Component,
  } = props;

  const [formRefs, setFormRefs] = React.useState({});

  React.useEffect(() => {
    // add or remove refs
    const refs = {};
    forms.forEach((f) => {
      refs[f.name] = React.createRef();
    });
    setFormRefs(refs);
  }, [forms]);

  const [values, setValues] = React.useReducer((oldValues: any, { type, value, key }: ReducerAction) => {
    switch (type) {
      case 'add':
      case 'update':
        return {
          ...oldValues,
          [key]: value,
        };
      default:
        return oldValues;
    }
  }, {});

  const handleValidationChange = ({ name, value, error }: FormValueError) => {
    if (name in values) {
      setValues({
        type: 'update',
        key: name,
        value: {
          value,
          error,
        },
      });
    } else {
      setValues({
        type: 'add',
        key: name,
        value: {
          value,
          error,
        },
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(values);
    let isError = false;
    forms.forEach((f) => {
      let val;
      if (f.name in values) {
        val = values[f.name];
      } else {
        const ref = formRefs[f.name];
        val = ref.current.getValue();
        setValues({
          type: 'add',
          key: f.name,
          value: val.value,
        });
      }
      if (val.error !== '') {
        isError = true;
      }
    });
    if (!isError) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        forms.map((f) => (
          <MyInput
            ref={formRefs[f.name]}
            key={`myInput-${f.name}`}
            name={f.name}
            initialValue={f.initialValue}
            label={f.label}
            placeholder={f.placeholder}
            type={f.type}
            validationSchema={f.validationSchema}
            onValidationChange={handleValidationChange}
            Component={Component}
          />
        ))
      }
      <button type="submit">Submit</button>
    </form>
  );
};

// const Counter: React.FC<{
//   count: number
//   className: string
// }> = ({ count, className }) => (
//   <div className={`counter ${className}`}>
//     <p
//       key={count}
//       className={`counter__count ${className ? className + '__count' : ''}`}
//     >
//       {count}
//     </p>
//   </div>
// )

// export type IReactBigFormProps = {
//   // className?: string
// }

// const ReactBigForm: React.FC<IReactBigFormProps> = (
//   // { className = '' }
//   ) => {
//   const [count, setCount] = useState(1)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (count > 99) return setCount(0)

//       setCount(count + 1)
//     }, 1000)

//     return () => clearInterval(interval)
//   }, [count, setCount])

//   return <Counter className={className} count={count} />
// }

export default ReactBigForm