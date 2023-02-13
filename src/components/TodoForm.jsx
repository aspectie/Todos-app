import React from 'react';
import { Field, reduxForm } from 'redux-form';

let TodoForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Title">Title of todo</label>
        <Field name="Title" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="Description">Description of todo</label>
        <Field name="Description" component="input" type="text" />
      </div>
      <button type="submit">Add todo</button>
    </form>
  )
}

TodoForm = reduxForm({form: 'todoForm'})(TodoForm);

export default TodoForm;