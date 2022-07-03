import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import ThemeProvider from "@mui/material/styles/ThemeProvider";
// import createTheme from "@mui/material/styles/createTheme";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   primaryColor,
//   darkGray,
//   disabledButton,
//   disabledButtonText,
//   success,
//   danger,
// } from "@components/Helpers/GlobalVariables";
import Layout from "@components/Layout";
// import { Spinner } from "@components/UI/Spinner";
import Dashboard from "@components/Dashboard";
import Home from '.';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from "src/configs/theme";
// import Home from '.';
// const theme = createTheme({});

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: primaryColor,
//     },
//     secondary: { main: darkGray },
//     success: { main: success },
//     // danger: { main: danger },
//     action: {
//       disabledBackground: disabledButton,
//       disabled: disabledButtonText,
//     },
//   },
//   typography: {
//     // fontFamily: [Neue].join(","),
//   },
//   // MuiTypography: {
//   //   defaultProps: {
//   //     variantMapping: {
//   //       h1: "h1",
//   //       h2: "h2",
//   //       h3: "h3",
//   //       h4: "h4",
//   //       h5: "h5",
//   //       h6: "h6",
//   //       subtitle1: "h2",
//   //       subtitle2: "h2",
//   //       body1: "span",
//   //       body2: "span",
//   //     },
//   //   },
//   // },
// });

// { Component, pageProps }: AppProps
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Layout>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </Layout>
    //  <ThemeProvider theme={theme}>
    //     {/* <Home></Home> */}
    //   </ThemeProvider>
  )
}
// <Component {...pageProps} />

// <ThemeProvider theme={theme}>
//   <BrowserRouter>
//     {false ? (
//       <Spinner />
//     ) : (
//       <Routes>
//         <Route
//           path={"*"}
//           element={
//             <Layout>
//               <Dashboard />
//             </Layout>
//           }
//         />
//       </Routes>
//     )}
//   </BrowserRouter>
// </ThemeProvider>

export default MyApp
