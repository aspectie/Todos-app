import React from 'react';
import { Field, reduxForm } from 'redux-form';

let TodoForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="title" className="block mb-2">Title of todo:</label>
        <Field id="title" name="title" component="input" type="text" className="block form-input"/>
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block mb-2">Description of todo:</label>
        <Field id="description" name="description" component="input" type="text" className="block form-input" />
      </div>
      <button type="submit" className="p-2 rounded-lg bg-orange-300 text-white hover:bg-orange-400">Add todo</button>
    </form>
  )
}

TodoForm = reduxForm({form: 'todoForm'})(TodoForm);

export default TodoForm;