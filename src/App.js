import TodoForm from "./components/TodoForm";
import { useDispatch } from 'react-redux'
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

  return (
    <div className="App">
        <TodoForm onSubmit={(values) => submitHandler(values)}/>
    </div>
  );
}

export default App;