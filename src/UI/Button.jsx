import React from 'react'

function Button(props) {
  return (
    <button {...props} onClick={props.clickHandler}>{props.children}</button>
  )
}

export default Button