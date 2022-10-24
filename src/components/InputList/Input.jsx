import React from 'react'
import './Input.css'
const Input = ({ value, id, type, onKeyDown }) => {
  return (
    <div className={'InputContainer'}>
      <span className={'InputCircle'}></span>
      <input
        type={type}
        value={value}
        id={id}
        onKeyDown={onKeyDown}
        placeholder="Create a new todo..."
      />
    </div>
  )
}

export default Input
