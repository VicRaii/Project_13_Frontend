import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  useColorModeValue,
  Container
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Box bg={useColorModeValue('brand.100', 'gray.800')} minH='100vh' py={10}>
      <Container maxW='6xl'>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align='center'
          spacing={10}
        >
          {/* Text Section */}
          <Box flex='1'>
            <Heading
              as='h1'
              size='2xl'
              color='brand.600'
              mb={4}
              lineHeight='shorter'
            >
              Bienvenido a IEC Digital
            </Heading>
            <Text fontSize='lg' color='gray.600' mb={6}>
              Un lugar donde la fe y la comunidad se encuentran con la
              tecnología. Explora nuestras prédicas, eventos y más.
            </Text>
            <Stack direction='row' spacing={4}>
              <Button
                as={Link}
                to='/preachings'
                colorScheme='brand'
                bg='brand.500'
                _hover={{ bg: 'accent.500' }}
              >
                Ver Predicaciones
              </Button>
              <Button
                as={Link}
                to='/about'
                variant='outline'
                colorScheme='brand'
              >
                Conócenos
              </Button>
            </Stack>
          </Box>

          {/* Image Section */}
          <Box flex='1' textAlign='center'>
            <Image
              src='/assets/IECicon.png'
              alt='Logo Iglesia Evangelica de Cabra'
              maxW={{ base: '60%', md: '80%' }}
              mx='auto'
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Home
