import React from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required'

const renderField = ({id, input, label, type, meta: {touched, error}}) => {
  let invalidClass = touched && error ? 'border-red-600' : '';

  return (<div className="mb-5">
    <label htmlFor={id} className="block mb-2">{label}</label>
    <input {...input} type={type} id={id} className={invalidClass}/>
    {touched && (error && <p className='text-red-600'>{error}</p>)}
  </div>)
}

let TodoForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        id="title"
        name="title"
        component={renderField}
        type="text"
        label="Title of todo:"
        className="block form-input"
        validate={[required]}
      />
      <Field
        id="description"
        name="description"
        component={renderField}
        type="text"
        label="Description of todo:"
        className="block form-input"
        validate={[required]}
      />
      <button
        type="submit"
        className="p-2 rounded-lg bg-orange-400 text-white hover:bg-amber-500"
      >Add todo</button>
    </form>
  )
}

TodoForm = reduxForm({form: 'todoForm'})(TodoForm);

export default TodoForm;