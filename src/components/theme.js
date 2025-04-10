import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e5f9f6',
      100: '#c2ebe4',
      200: '#9edcd1',
      300: '#78ccbd',
      400: '#4fbdab',
      500: '#36a392', // Verde medio (logo)
      600: '#2a8073',
      700: '#1e5e54',
      800: '#123d36',
      900: '#061d19'
    },
    accent: {
      500: '#0077b6' // Azul del logo
    }
  }
})

export default theme
