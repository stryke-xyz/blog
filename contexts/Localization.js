import { useState, useCallback, createContext } from 'react'
import { LANGUAGE_MAPPING } from 'constants/index'

const initialState = {
  selectedLanguage: LANGUAGE_MAPPING.english,
  setSelectedLanguage: () => {},
}

export const LocalizationContext = createContext(initialState)

export const LocalizationProvider = (props) => {
  const [state, setState] = useState(initialState)

  const setSelectedLanguage = useCallback((language) => {
    if (!LANGUAGE_MAPPING[language]) return
    setState((prevState) => ({ ...prevState, selectedLanguage: LANGUAGE_MAPPING[language] }))
  }, [])

  const contextValue = {
    ...state,
    setSelectedLanguage,
  }

  return (
    <LocalizationContext.Provider value={contextValue}>
      {props.children}
    </LocalizationContext.Provider>
  )
}
