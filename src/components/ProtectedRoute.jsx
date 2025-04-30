import { Navigate, useLocation } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useAuth } from '../hooks/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()
  const toast = useToast()

  if (!user?.token) {
    toast({
      title: 'Acceso denegado',
      description: 'Debes iniciar sesión para ver esta página.',
      status: 'warning',
      duration: 3000,
      isClosable: true
    })

    return <Navigate to='/auth' state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
