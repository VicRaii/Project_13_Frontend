import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Image
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const HeroSection = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.800')}
      minH={{ base: '80vh', md: '100vh' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      px={6}
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        align='center'
        spacing={10}
        maxW='6xl'
        textAlign={{ base: 'center', md: 'left' }}
      >
        {/* TEXTOS */}
        <Box flex='1' textAlign={'center'}>
          <Heading as='h1' size='2xl' mb={4}>
            Bienvenido a la Iglesia Evángelica de Cabra
          </Heading>
          <Text fontSize='xl' mb={6}>
            Un espacio para conectar con Dios, crecer espiritualmente y
            compartir en comunidad.
          </Text>
          <Button
            colorScheme='teal'
            as={RouterLink}
            to='/series'
            size='lg'
            px={8}
          >
            Ver Series de Predicaciones
          </Button>
        </Box>

        {/* IMAGEN */}
        <Box flex='1' display='flex' justifyContent='center'>
          <Image
            src='/assets/IECicon.png'
            alt='Iglesia Evángelica de Cabra'
            boxSize={{ base: '200px', md: '300px' }}
            objectFit='contain'
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default HeroSection
