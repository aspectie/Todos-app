import { TodoItem } from "./TodoItem";
import { toggleTodoThunk } from "../../store/todos-reducer";
import { useDispatch } from "react-redux";

export function TodoList({ todos }) {
  const dispatch = useDispatch();
  const onCheckedChange = (id) => {
    dispatch(toggleTodoThunk(id));
  };

  return todos && todos.length > 0 ? (
    todos.map((todo) => (
      <TodoItem
        id={todo.id}
        key={todo.id}
        title={todo.title}
        completed={todo.completed}
        toggleHandler={() => onCheckedChange(todo.id)}
      />
    ))
  ) : (
    <span className="text-xs text-stone-400 underline">No todos.</span>
  );
}
