import React from 'react'
import Button from '../UI/Button'

import { useDispatch } from 'react-redux'
import { toggleTodoIsDone } from '../store/todos-reducer'


const onTodoComplete = (dispatch, id) => {
  dispatch(toggleTodoIsDone(id))
}

function TodoItem({ title, description, id, isDone }) {
  const dispatch = useDispatch();
  return (
    <div className="mb-3 pt-2 w-1/3 border border-blue-300 rounded bg-blue-100">
        <p className="mb-2 px-2">Title: {title}</p>
        <p className='mb-2 px-2'>Description: {description}</p>
        <Button className={`${isDone ? 'bg-orange-300 hover:bg-amber-500' : 'bg-amber-500 hover:bg-orange-400'} w-full p-2 rounded-b`} clickHandler={() => onTodoComplete(dispatch, id)}>{isDone ? 'Undone' : 'Done'}</Button>
    </div>
  )
}

export default TodoItem