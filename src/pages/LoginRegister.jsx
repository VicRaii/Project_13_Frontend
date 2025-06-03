import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { authReducer, initialState } from '../hooks/authReducer'
import { useAuth } from '../hooks/AuthContext'

const LoginRegister = () => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const { isLogin, loading } = state
  const { register, handleSubmit, reset } = useForm()
  const toast = useToast()
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const onSubmit = async (data) => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      if (isLogin) {
        await loginUser(data)
      } else {
        const registerRes = await fetch(
          `${import.meta.env.VITE_API_URL}/users/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, userName: data.userName })
          }
        )

        const registerResult = await registerRes.json()
        if (!registerRes.ok)
          throw new Error(registerResult.message || 'Error al registrarse')

        toast({
          title: 'Registro exitoso',
          status: 'success',
          duration: 3000,
          isClosable: true
        })

        await loginUser({ email: data.email, password: data.password })
      }

      reset()
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const loginUser = async ({ email, password }) => {
    const loginRes = await fetch(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    )

    const loginResult = await loginRes.json()
    if (!loginRes.ok)
      throw new Error(loginResult.message || 'Error al iniciar sesión')

    const { token, user } = loginResult

    localStorage.setItem('token', token)
    localStorage.setItem('role', user.role)

    setUser({ token, role: user.role })

    toast({
      title: 'Login exitoso',
      status: 'success',
      duration: 3000,
      isClosable: true
    })

    if (user.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/series')
    }
  }

  return (
    <Box
      maxW='500px'
      h='400px'
      bg='white'
      alignContent={'center'}
      mx='auto'
      mt={10}
      p={6}
      boxShadow='lg'
      borderRadius='xl'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {!isLogin && (
            <FormControl isRequired>
              <FormLabel>Nombre de usuario</FormLabel>
              <Input {...register('userName')} />
            </FormControl>
          )}

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' {...register('email')} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input type='password' {...register('password')} />
          </FormControl>

          <Button type='submit' colorScheme='teal' isLoading={loading}>
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </Button>

          <Button
            variant='link'
            onClick={() => dispatch({ type: 'TOGGLE_LOGIN' })}
            colorScheme='blue'
          >
            {isLogin
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default LoginRegister
