import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosThunk, Todo } from "./store/todos-slice";
import { AppDispatch, RootState } from "./store/root-store";

import { TodoList } from "./components/Todo/TodoList";
import { TodosToolbar } from "./components/Todo/TodosToolbar";
import { AddTodoDialog } from "./components/Todo/AddTodoDialog";

enum FilterType {
  ACTIVE = "active",
  COMPLETED = "completed",
  ALL = "all",
}

type TFilterType = (typeof FilterType)[keyof typeof FilterType];

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [todos, setTodos] = useState<Todo[]>([]);

  const allTodos = useSelector((state: RootState) => state.todos.todos);
  const selectNewTodos = createSelector(
    [(state: RootState) => state.todos],
    ({ todos }) => {
      return todos.filter((t) => !t.completed);
    },
  );
  const selectDoneTodos = createSelector(
    [(state: RootState) => state.todos],
    ({ todos }) => {
      return todos.filter((t) => t.completed);
    },
  );

  const newTodos = useSelector(selectNewTodos);
  const doneTodos = useSelector(selectDoneTodos);

  const filterTodos = (filter: TFilterType) => {
    const filterMap: Record<FilterType, () => void> = {
      active: () => setTodos([...newTodos]),
      completed: () => setTodos([...doneTodos]),
      all: () => setTodos([...allTodos]),
    };
    if (typeof filterMap[filter] === "function") {
      filterMap[filter]();
    }
  };

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  useEffect(() => {
    filterTodos(filter);
  }, [filter, allTodos]);

  return (
    <div className="flex flex-col w-3/4 m-auto p-5 bg-neutral-100 min-h-screen">
      <h1 className="py-5 text-2xl border-b">Todo Application</h1>
      <div className="py-5 mb-2">
        <AddTodoDialog />
      </div>
      <TodosToolbar
        onClickAll={() => setFilter(FilterType.ALL)}
        onClickActive={() => setFilter(FilterType.ACTIVE)}
        onClickCompleted={() => setFilter(FilterType.COMPLETED)}
        activeButton={filter}
      />
      {todos.length > 0 && (
        <div className="p-5 bg-white">
          <TodoList todos={todos} />
        </div>
      )}
    </div>
  );
}

export default App;
