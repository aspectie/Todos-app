import React from 'react'

function TodoItem({ title, description }) {
  return (
    <div className="mb-3 p-2 w-1/3 border border-blue-300 rounded bg-blue-100">
        <p className="mb-2">Title: {title}</p>
        <p>Description: {description}</p>
    </div>
  )
}

export default TodoItem