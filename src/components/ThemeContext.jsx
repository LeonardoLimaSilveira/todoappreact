import React from 'react'

export const GlobalContext = React.createContext()

export const ThemeChange = ({ children }) => {
  const [theme, setTheme] = React.useState(true)

  return (
    <GlobalContext.Provider value={[theme, setTheme]}>
      {children}
    </GlobalContext.Provider>
  )
}
