import React from 'react'
import { GlobalContext } from '../ThemeContext'
import './Input.css'
const Input = ({ value, id, type, onKeyDown }) => {
  const [theme] = React.useContext(GlobalContext)
  return (
    <div className={theme ? 'InputContainer' : 'InputContainerDark'}>
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
