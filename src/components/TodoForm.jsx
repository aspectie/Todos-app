import React from 'react';
import { Field, reduxForm } from 'redux-form';

let TodoForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todoTitle">Title</label>
        <Field name="todoTitle" component="input" type="text" />
      </div>
    </form>
  )
}

TodoForm = reduxForm({form: 'todoForm'})(TodoForm);

export default TodoForm;