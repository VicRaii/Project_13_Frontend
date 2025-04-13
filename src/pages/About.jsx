import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Avatar,
  Stack,
  Icon,
  Divider,
  Link
} from '@chakra-ui/react'
import { AiOutlineMail, AiOutlineInfoCircle } from 'react-icons/ai'
import React from 'react'
import { useForm } from 'react-hook-form'

const team = [
  {
    name: 'Cícero Da Costa',
    role: 'Pastor',
    image: '/assets/CiceroAvatar.png'
  },
  {
    name: 'Óscar Roldán',
    role: 'Líder de Alabanza',
    image: '/assets/AlabanzaAvatar.png'
  },
  {
    name: 'Juan Jesús Fernández',
    role: 'Anciano',
    image: '/assets/Anciano1Avatar.png'
  },
  {
    name: 'José Alejandro López',
    role: 'Anciano',
    image: '/assets/Anciano2Avatar.png'
  }
]

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    reset()
  }

  return (
    <Box
      as='form'
      onSubmit={handleSubmit(onSubmit)}
      p={6}
      bg='white'
      boxShadow='md'
      borderRadius='lg'
    >
      <FormControl mb={4}>
        <FormLabel>Nombre</FormLabel>
        <Input {...register('name')} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type='email' {...register('email')} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Mensaje</FormLabel>
        <Textarea {...register('message')} />
      </FormControl>
      <Button type='submit' colorScheme='teal'>
        Enviar
      </Button>
    </Box>
  )
}

const About = () => {
  return (
    <>
      {/* HERO SECTION */}
      <Box
        bgImage="url('/assets/AboutBG.jpg')"
        bgSize='cover'
        bgPosition='center'
        bgRepeat='no-repeat'
        filter={'opacity(0.8)'}
        color='brand.500'
        py={20}
        textAlign='center'
      >
        <Heading fontSize={['3xl', '5xl']} mb={4}>
          Conócenos
        </Heading>
        <Text fontSize='xl' maxW='2xl' mx='auto'>
          Somos una Iglesia que busca amar y servir a Dios y a las personas
          llevando el mensaje de vida y esperanza que hay en Jesucristo.
        </Text>
      </Box>

      {/* INFO SECTION */}
      <Container maxW='6xl' py={10}>
        <VStack spacing={6} align='center'>
          <Heading as='h2' size='lg'>
            ✨ Misión
          </Heading>
          <Text>
            Inspirar y empoderar a las personas a vivir conforme al propósito
            que Dios tiene para ellos.
          </Text>

          <Heading as='h2' size='lg'>
            🔭 Visión
          </Heading>
          <Text>
            Ser una comunidad vibrante y acogedora donde cada persona pueda
            crecer espiritualmente y servir con amor.
          </Text>

          <Heading as='h2' size='lg'>
            💖 Valores
          </Heading>
          <Text>• Amor • Fe • Unidad • Servicio • Integridad</Text>

          <Divider />

          <Heading as='h2' size='xl' mt={10}>
            👥 Nuestro Equipo
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={8} mt={6}>
            {team.map((member, index) => (
              <Box
                key={index}
                p={6}
                boxShadow='lg'
                borderRadius='xl'
                textAlign='center'
                bg='gray.50'
              >
                <Avatar
                  size='xl'
                  name={member.name}
                  src={member.image}
                  mb={4}
                />
                <Heading size='md'>{member.name}</Heading>
                <Text fontSize='sm' color='gray.600'>
                  {member.role}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <Divider />

          <Stack spacing={2} pt={6}>
            <Heading as='h2' size='lg'>
              <Icon as={AiOutlineInfoCircle} mr={2} />
              Contacto
            </Heading>
            <Text>
              <Icon as={AiOutlineMail} mr={2} />
              <Link
                href='mailto:iglesiaevangelicacabra@gmail.com'
                color='teal'
                isExternal
              >
                iglesiaevangelicacabra@gmail.com
              </Link>
            </Text>
          </Stack>
        </VStack>
      </Container>
    </>
  )
}

export default About
