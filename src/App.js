import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

import { useDispatch, useSelector } from 'react-redux'
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
  }

  const todos = useSelector(state => state.todos.todos)

  return (
    <div className="App">
        <TodoForm onSubmit={(values) => submitHandler(values)} />
        { todos?.map(todo => <TodoItem title={todo.title} description={todo.description} key={todo.id} />) }
    </div>
  );
}

export default App;