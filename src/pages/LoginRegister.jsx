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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const url = `${import.meta.env.VITE_API_URL}${
        isLogin ? '/users/login' : '/users/register'
      }`

      const payload = isLogin ? data : { ...data, userName: data.userName }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.message || 'Error')

      toast({
        title: isLogin ? 'Login exitoso' : 'Registro exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      reset()
      navigate('/events')
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW='400px' mx='auto' mt={10} p={6} boxShadow='lg' borderRadius='xl'>
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
            onClick={() => setIsLogin(!isLogin)}
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

//

export default LoginRegister
