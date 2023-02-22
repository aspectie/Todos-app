import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: []
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    toggleTodoIsDone(state, action) {
      const id = action.payload;

      state.todos.map(t => {
        if (t.id === id) {
          t.isDone = !t.isDone;
        }
      })
    }
  }
})

export const { addTodo, toggleTodoIsDone } = todosSlice.actions
export default todosSlice.reducer