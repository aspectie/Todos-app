import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodosThunk = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
      );

      if (!data.ok) {
        throw new Error("server error");
      }
      return await data.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const toggleTodoThunk = createAsyncThunk(
  "todos/toggleTodo",
  async function (id, { dispatch, rejectWithValue, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            completed: !todo.completed,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      );

      if (!data.ok) {
        throw new Error("server error");
      }
      dispatch(toggleTodoIsDone(id));
      return await data.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async function (todo, { dispatch, rejectWithValue, getState }) {
    try {
      const data = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: "POST",
        body: JSON.stringify({
          title: todo.title,
          completed: false,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!data.ok) {
        throw new Error("server error");
      }
      const newTodo = await data.json();
      dispatch(addTodo(newTodo));

      return newTodo;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

const initialState = {
  todos: [],
  status: null,
  error: null,
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    toggleTodoIsDone(state, action) {
      const id = action.payload;

      state.todos.map((t) => {
        if (t.id === id) {
          t.completed = !t.completed;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.todos = action.payload;
      })
      .addCase(fetchTodosThunk.rejected, setError)
      .addCase(addTodoThunk.rejected, setError)
      .addCase(toggleTodoThunk.rejected, setError);
  },
});

const { addTodo, toggleTodoIsDone } = todosSlice.actions;

export default todosSlice.reducer;
