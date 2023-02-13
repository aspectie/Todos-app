import React from 'react';
import { Field, reduxForm } from 'redux-form';

let TodoForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title of todo</label>
        <Field name="title" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="description">Description of todo</label>
        <Field name="description" component="input" type="text" />
      </div>
      <button type="submit">Add todo</button>
    </form>
  )
}

TodoForm = reduxForm({form: 'todoForm'})(TodoForm);

export default TodoForm;