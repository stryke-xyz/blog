import {
  useState,
  useEffect,
  useCallback,
  createContext,
  ReactFragment,
  ReactPortal,
  ReactNode,
} from 'react';
import { useRouter } from 'next/router';

import { Languages } from 'types';

interface LocalizationContextProps {
  selectedLanguage: Languages;
  setSelectedLanguage: Function;
}

const initialState: LocalizationContextProps = {
  selectedLanguage: 'en',
  setSelectedLanguage: () => {},
};

export const LocalizationContext = createContext(initialState);

export const LocalizationProvider = (props: {
  children: boolean | ReactFragment | ReactPortal | ReactNode | null | undefined;
}) => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const setSelectedLanguage = useCallback(
    (language: string) => {
      if (!router.asPath) return;
      router.push(router.asPath, router.asPath, {
        locale: language,
      });
      setState((prevState) => ({
        ...prevState,
        selectedLanguage: language as Languages,
      }));
    },
    [router]
  );

  useEffect(() => {
    if (router.locale === 'en') return;
    setState((prevState) => ({
      ...prevState,
      selectedLanguage: router.locale as Languages,
    }));
  }, [router, setState]);

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
