import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import Theme from './components/theme.js'
import { AuthProvider } from './hooks/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={Theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>
)
