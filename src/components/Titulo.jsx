import React from 'react'
import { GlobalContext } from './ThemeContext'

const Titulo = () => {
  const [word] = React.useContext(GlobalContext)
  return <h1>{word ? 'Titulo' : 'Word'}</h1>
}

export default Titulo
