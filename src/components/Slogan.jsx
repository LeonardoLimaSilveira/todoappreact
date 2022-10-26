import React from 'react'
import { GlobalContext } from './ThemeContext'
import './Slogan.css'
import { ReactComponent as Moon } from '../../public/images/icon-moon.svg'
import { ReactComponent as Sun } from '../../public/images/icon-sun.svg'

const Teste = () => {
  const [dark, setDark] = React.useContext(GlobalContext)

  return (
    <div className={'slogan'}>
      <h1>Todo</h1>
      <GlobalContext.Provider value={(dark, setDark)}>
        <span
          onClick={() => {
            setDark(!dark)
          }}
        >
          {dark ? <Moon /> : <Sun />}
        </span>
      </GlobalContext.Provider>
    </div>
  )
}

export default Teste
