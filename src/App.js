import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

import { useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import { addTodoThunk, fetchTodosThunk } from "./store/todos-reducer";

import uuid from "react-uuid";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  const submitHandler = ({ title }) => {
    let todo = {
      title,
      isDone: false,
      id: uuid(),
    };

    dispatch(addTodoThunk(todo));
    dispatch(reset("todoForm"));
  };
  const todos = useSelector((state) => state.todos.todos);
  const selectNewTodos = createSelector(
    [(state) => state.todos],
    ({ todos }) => {
      return todos.filter((t) => !t.completed);
    },
  );
  const selectDoneTodos = createSelector(
    [(state) => state.todos],
    ({ todos }) => {
      return todos.filter((t) => t.completed);
    },
  );

  const newTodos = useSelector(selectNewTodos);
  const doneTodos = useSelector(selectDoneTodos);

  return (
    <div className="flex flex-col w-3/4 m-auto p-5 bg-neutral-100 min-h-screen">
      <h1 className="py-5 text-2xl border-b">Todo Application</h1>
      <div className="py-5 border-b">
        <TodoForm onSubmit={(values) => submitHandler(values)} />
      </div>
      {todos.length > 0 && (
        <div className="p-5 bg-white">
          <TodoList todos={todos} />
        </div>
      )}
    </div>
  );
}

export default App;
