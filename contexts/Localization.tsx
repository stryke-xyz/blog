import { useState, useCallback, createContext, ReactFragment, ReactPortal, ReactNode } from 'react';
import { LANGUAGE_MAPPING } from 'constants/index';

import { Languages } from 'types';

interface LocalizationContextProps {
  selectedLanguage: Languages;
  setSelectedLanguage: Function;
}

const initialState: LocalizationContextProps = {
  selectedLanguage: LANGUAGE_MAPPING['english'],
  setSelectedLanguage: () => {},
};

export const LocalizationContext = createContext(initialState);

export const LocalizationProvider = (props: {
  children: boolean | ReactFragment | ReactPortal | ReactNode | null | undefined;
}) => {
  const [state, setState] = useState(initialState);

  const setSelectedLanguage = useCallback((language: string) => {
    if (!LANGUAGE_MAPPING[language]) return;
    setState((prevState) => ({ ...prevState, selectedLanguage: LANGUAGE_MAPPING[language] }));
  }, []);

  const contextValue = {
    ...state,
    setSelectedLanguage,
  };

  return (
    <LocalizationContext.Provider value={contextValue}>
      {props.children}
    </LocalizationContext.Provider>
  );
};
