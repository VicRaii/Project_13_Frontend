import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  IconButton,
  Link,
  useToast,
  Spinner
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'
import axios from 'axios'

const ContactPage = () => {
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
    <Box p={8} bg='blue.50' minH='100vh'>
      <Heading textAlign='center' fontSize='4xl' color='orange.400' mb={4}>
        ¿Tienes alguna pregunta?
      </Heading>
      <Text textAlign='center' fontSize='lg' color='gray.700' mb={10}>
        Por favor, no dudes en ponerte en contacto con nosotros sea cual sea tu
        duda o necesidad. Estamos para servirte.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <VStack align='start' spacing={6}>
          <Box>
            <Heading fontSize='2xl' mb={2}>
              Contactar
            </Heading>
            <Text fontSize='md' color='gray.600'>
              Información general
            </Text>
            <Text mt={3} fontWeight='bold' color='orange.400'>
              +34 696 331 326
            </Text>
            <Text mt={1} color='orange.400'>
              iglesiaevangelicacabra@gmail.com
            </Text>
          </Box>

          <Box>
            <Heading fontSize='lg' mb={4}>
              Redes Sociales
            </Heading>
            <HStack spacing={4}>
              <Link
                href='https://www.facebook.com/Iglesiaevangelicadecabra'
                isExternal
              >
                <IconButton
                  icon={<FaFacebook />}
                  aria-label='Facebook'
                  variant='ghost'
                  size='lg'
                />
              </Link>
              <Link
                href='https://www.youtube.com/@iglesiaevangelicadecabra8049'
                isExternal
              >
                <IconButton
                  icon={<FaYoutube />}
                  aria-label='YouTube'
                  variant='ghost'
                  size='lg'
                />
              </Link>
              <Link
                href='https://www.instagram.com/iglesia_evangelica_de_cabra/'
                isExternal
              >
                <IconButton
                  icon={<FaInstagram />}
                  aria-label='Instagram'
                  variant='ghost'
                  size='lg'
                />
              </Link>
            </HStack>
          </Box>
        </VStack>

        <Box bg='white' p={6} borderRadius='xl' boxShadow='md'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.name} isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder='Tu nombre'
                  {...register('name', {
                    required: 'El nombre es obligatorio'
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='correo@ejemplo.com'
                  {...register('email', {
                    required: 'El email es obligatorio'
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isRequired>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  type='tel'
                  placeholder='Teléfono de contacto'
                  {...register('phone')}
                />
              </FormControl>

              <FormControl isInvalid={errors.message} isRequired>
                <FormLabel>Mensaje</FormLabel>
                <Textarea
                  placeholder='Escribe tu mensaje'
                  rows={5}
                  {...register('message', {
                    required: 'El mensaje es obligatorio'
                  })}
                />
                <FormErrorMessage>
                  {errors.message && errors.message.message}
                </FormErrorMessage>
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
      </SimpleGrid>
    </Box>
  )
}

export default ContactPage
