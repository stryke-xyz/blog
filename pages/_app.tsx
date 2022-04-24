import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { StyledEngineProvider } from '@mui/material';

import LayoutWrapper from '@/components/LayoutWrapper';

import { LocalizationProvider } from 'contexts/Localization';

import 'tailwindcss/tailwind.css';
import '@/style/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider attribute="class">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <LocalizationProvider>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
