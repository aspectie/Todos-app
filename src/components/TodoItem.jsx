import React from 'react'

function TodoItem({ title, description }) {
  return (
    <div>
        <p>title: {title}</p>
        <p>descr: {description}</p>
    </div>
  )
}

export default TodoItem