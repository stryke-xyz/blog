import {
  useState,
  useCallback,
  createContext,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from 'react';
import { LANGUAGE_MAPPING } from 'constants/index';

interface LocalizationContextProps {
  selectedLanguage: string;
  setSelectedLanguage: Function;
}

const initialState: LocalizationContextProps = {
  selectedLanguage: LANGUAGE_MAPPING.english,
  setSelectedLanguage: () => {},
};

export const LocalizationContext = createContext(initialState);

export const LocalizationProvider = (props: {
  children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
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
