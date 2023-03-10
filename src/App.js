import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

import { useDispatch, useSelector } from 'react-redux'
import { reset } from 'redux-form'
import { addTodo } from './store/todos-reducer';

import uuid from 'react-uuid';

function App() {
  const dispatch = useDispatch();

  const submitHandler = (values) => {
    let todo = {
      ...values,
      isDone: false,
      id: uuid()
    }

    dispatch(addTodo(todo))
    dispatch(reset('todoForm'))
  }

  const todos = useSelector(state => state.todos.todos)
  const newTodos = todos.filter(t => !t.isDone)
  const doneTodos = todos.filter(t => t.isDone)

  return (
    <div className="flex flex-col w-3/4 m-auto p-5 bg-neutral-100 min-h-screen">
        <h1 className="py-5 text-2xl border-b">Todo Application</h1>
        <div className="py-5 border-b">
          <h2 className="mb-5 text-lg">Add new todo</h2>
          <TodoForm onSubmit={(values) => submitHandler(values)} />
        </div>
        {todos.length > 0 &&
          <div className="grid grid-cols-2">
              <div className="py-5">
                <h2 className="mb-5 text-xl">Todos: </h2>
                {newTodos.length > 0 ? newTodos.map(todo => <TodoItem key={todo.id} {...todo} />) : <span className="text-xs text-stone-400 underline">No todos.</span>}
              </div>
              <div className="py-5">
                <h2 className="mb-5 text-xl">Done Todos: </h2>
                {doneTodos.length > 0 ? doneTodos.map(todo => <TodoItem key={todo.id} {...todo} />) : <span className="text-xs text-stone-400 underline">No done todos.</span>}
              </div>

          </div>
        }
    </div>
  );
}

export default App;