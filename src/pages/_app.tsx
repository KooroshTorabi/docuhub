import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from "src/configs/theme";
import { store } from 'src/reduxtoolkit/store';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    // <Layout>
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
    </ChakraProvider>
  )
}

export default MyApp
