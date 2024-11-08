import { TodoItem } from "./TodoItem";
import { Todo, toggleTodoThunk } from "../../store/todos-reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/root-store";

export function TodoList({ todos }: { todos: Todo[] }) {
  const dispatch: AppDispatch = useDispatch();
  const onCheckedChange = (id: number) => {
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
