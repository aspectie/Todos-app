import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {

      try {
        const data = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

        if (!data.ok) {
          throw new Error('server error')
        }
        return await data.json()
      } catch (e) {
        return rejectWithValue(e.message);
      }
})

export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async function(id, {dispatch, rejectWithValue, getState}) {
      const todo = getState().todos.todos.find(todo => todo.id === id);
      console.log(todo)
      try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            id,
            completed: todo.completed,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })

        if (!data.ok) {
          throw new Error('server error')
        }
        dispatch(toggleTodoIsDone(id));
        return await data.json()
      } catch (e) {
        return rejectWithValue(e.message);
      }
    })

const initialState = {
  todos: [],
  status: null,
  error: null
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
          t.completed = !t.completed;
        }
      })
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [toggleTodo.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
})


export const { addTodo, toggleTodoIsDone } = todosSlice.actions
export default todosSlice.reducer