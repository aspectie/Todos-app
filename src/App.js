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
      id: uuid()
    }

    dispatch(addTodo(todo))
    dispatch(reset('todoForm'))
  }

  const todos = useSelector(state => state.todos.todos)

  return (
    <div className="flex flex-col w-3/4 m-auto p-5 bg-neutral-100 h-screen">
        <h1 className="py-5 text-2xl">Todo Application</h1>
        <div className="mt-5">
          <h2 className="mb-5 text-lg">Add new todo</h2>
          <TodoForm onSubmit={(values) => submitHandler(values)} />
        </div>
        {todos.length > 0 && 
          <div className="mt-5 py-5">
            <h2 className="mb-5 text-xl">Todos: </h2>
            { todos?.map(todo => <TodoItem title={todo.title} description={todo.description} key={todo.id} />) }
          </div>
        }
    </div>
  );
}

export default App;