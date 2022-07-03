import { createBreakpoints } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  common: {
    grey: '#afafaf',
    yellow: '#E09900',
  },
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
    600: '#62614F',
    500: '#cecece',
    400: '#ffff9b',
    300: '#223651',
    200: '#686868',
    100: '#1A293D',
  },
}

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})

export const theme = extendTheme({ colors, breakpoints })
