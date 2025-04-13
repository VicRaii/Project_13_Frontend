// src/components/ContactForm.jsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Spinner
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, data)

      toast({
        title: 'Mensaje enviado.',
        description: 'Gracias por contactarnos.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      reset()
    } catch (error) {
      toast({
        title: 'Error al enviar.',
        description: error.response?.data?.message || 'Intenta de nuevo.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box p={6} bg='white' boxShadow='md' borderRadius='xl'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Nombre</FormLabel>
            <Input
              placeholder='Tu nombre'
              {...register('name', { required: 'El nombre es obligatorio' })}
            />
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              placeholder='correo@ejemplo.com'
              {...register('email', { required: 'El email es obligatorio' })}
            />
          </FormControl>

          <FormControl isInvalid={errors.message}>
            <FormLabel>Mensaje</FormLabel>
            <Textarea
              placeholder='Escribe tu mensaje'
              {...register('message', {
                required: 'El mensaje es obligatorio'
              })}
            />
          </FormControl>

          <Button
            type='submit'
            colorScheme='teal'
            width='full'
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size='sm' /> : 'Enviar'}
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default ContactForm
