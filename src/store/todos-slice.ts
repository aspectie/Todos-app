import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./root-store";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const fetchTodosThunk = createAsyncThunk<
  Todo[],
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  try {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10",
    );

    if (!data.ok) {
      throw new Error("server error");
    }
    return await data.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      return rejectWithValue(e.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const toggleTodoThunk = createAsyncThunk<
  Todo,
  number,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  "todos/toggleTodo",
  async function (id, { dispatch, rejectWithValue, getState }) {
    try {
      const todo = getState().todos.todos.find((todo) => todo.id === id);

      if (!todo) {
        return rejectWithValue("no todo found");
      }
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  },
);

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async function (
    todo: {
      title: string;
    },
    { dispatch, rejectWithValue },
  ) {
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  },
);

export interface TodosState {
  todos: Todo[];
  status: "loading" | "fulfilled" | "rejected" | null;
  error: string | null;
}

export const initialState: TodosState = {
  todos: [],
  status: null,
  error: null,
};

const setError = (state: TodosState, action: PayloadAction<any>) => {
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

export const { addTodo, toggleTodoIsDone } = todosSlice.actions;

export default todosSlice.reducer;
