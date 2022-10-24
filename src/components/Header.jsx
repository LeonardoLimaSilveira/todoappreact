import React from 'react'
import './Header.css'
import { GlobalContext } from './ThemeContext'

const header = () => {
  const [theme] = React.useContext(GlobalContext)
  return <header className={theme ? 'headerLight' : 'headerDark'}></header>
}

export default header
