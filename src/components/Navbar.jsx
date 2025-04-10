import {
  Box,
  Flex,
  Image,
  Spacer,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800')
  const shadow = useColorModeValue('sm', 'md')

  return (
    <Box
      position='sticky'
      top='0'
      zIndex='sticky'
      bg={bg}
      boxShadow={shadow}
      px={6}
      py={3}
    >
      <Flex align='center' maxW='1200px' mx='auto'>
        {/* Logo */}
        <Link to='/'>
          <Image src='/assets/IECicon.png' alt='Logo' boxSize='50px' />
        </Link>

        <Spacer />

        {/* Links de navegación */}
        <Flex gap={{ base: 2, md: 4 }}>
          <Button as={Link} to='/' variant='ghost' colorScheme='teal'>
            Home
          </Button>
          <Button as={Link} to='/events' variant='ghost' colorScheme='teal'>
            Eventos
          </Button>
          <Button as={Link} to='/preachings' variant='ghost' colorScheme='teal'>
            Predicaciones
          </Button>
          <Button as={Link} to='/about' variant='ghost' colorScheme='teal'>
            Conócenos
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
