import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image
} from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai' // Importa los íconos de react-icons
import { Link } from 'react-router-dom'

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Eventos', path: '/events' },
  { name: 'Predicaciones', path: '/preachings' },
  { name: 'Conócenos', path: '/about' },
  { name: 'Login', path: '/auth' },
  { name: 'Contacto', path: '/contact' }
]

const NavLink = ({ name, path }) => (
  <Button
    as={Link}
    to={path}
    variant='ghost'
    colorScheme='teal'
    fontWeight='medium'
    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
  >
    {name}
  </Button>
)

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      px={6}
      boxShadow='md'
      position='sticky'
      top='0'
      zIndex='sticky'
    >
      <Flex
        h={16}
        alignItems='center'
        justifyContent='space-between'
        maxW='1200px'
        mx='auto'
      >
        <Link to='/'>
          <Image src='/assets/IECicon.png' alt='Logo' boxSize='50px' />
        </Link>

        <IconButton
          size='md'
          icon={isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          aria-label='Open Menu'
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <NavLink key={link.name} {...link} />
          ))}
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack spacing={2}>
            {Links.map((link) => (
              <NavLink key={link.name} {...link} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default Navbar
