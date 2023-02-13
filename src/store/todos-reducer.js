import {createReducer, createAction} from '@reduxjs/toolkit'

export const addTodo = createAction("ADD_TODO");

const initialState = {
  todos: []
};

export const todosReducer = createReducer(initialState, {
  [addTodo]: (state, action) => {
    state.todos.push(action.payload);
  }
})
