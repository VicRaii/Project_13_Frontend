import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Avatar,
  Divider,
  Image
} from '@chakra-ui/react'
import React from 'react'
import VerseOfTheDay from '../components/VerseOfTheDay'

const team = [
  {
    name: 'Cícero Da Costa',
    role: 'Pastor',
    image: '/assets/CiceroAvatar.png'
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

const About = () => {
  return (
    <>
      <Box
        bgImage="url('/assets/AboutBG.jpg')"
        bgSize='cover'
        bgPosition='center '
        bgRepeat='no-repeat'
        filter={'opacity(0.9)'}
        py={60}
      >
        <Box
          position={'absolute'}
          bottom={0}
          left={0}
          right={0}
          color='brand.500'
          textAlign='center'
          bg={'whiteAlpha.800'}
        >
          <Heading fontSize={['3xl', '5xl']} mb={4}>
            Conócenos
          </Heading>
          <Text fontSize='xl' maxW='2xl' mx='auto'>
            Somos una Iglesia que busca amar y servir a Dios y a las personas
            llevando el mensaje de vida y esperanza que hay en Jesucristo.
          </Text>
        </Box>
      </Box>

      <Container maxW='6xl' py={10}>
        <VStack spacing={6} align='center'>
          <Heading as='h2' size='lg'>
            ✨ Misión
          </Heading>
          <Text textAlign='center'>
            Inspirar y empoderar a las personas a vivir conforme al propósito
            que Dios tiene para ellos.
          </Text>

          <Heading as='h2' size='lg'>
            🔭 Visión
          </Heading>
          <Text textAlign='center'>
            Ser una comunidad vibrante y acogedora donde cada persona pueda
            crecer espiritualmente y servir con amor.
          </Text>

          <Heading as='h2' size='lg'>
            💖 Valores
          </Heading>
          <Text textAlign='center'>
            • Amor • Fe • Unidad • Servicio • Integridad
          </Text>

          <VerseOfTheDay apiKey={import.meta.env.VITE_BIBLE_API_KEY} />

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
        </VStack>
      </Container>
    </>
  )
}

export default About
