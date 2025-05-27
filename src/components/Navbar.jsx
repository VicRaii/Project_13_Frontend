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
import { AiOutlineClose, AiOutlineCrown, AiOutlineMenu } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Series', path: '/series', requiredAuth: true },
  { name: 'Conócenos', path: '/about', requiredAuth: true },
  { name: 'Contacto', path: '/contact', requiredAuth: true },
  { name: 'Login', path: '/auth', hideWhenAuth: true }
]

const NavLink = ({ name, path, isActive }) => (
  <Button
    as={Link}
    to={path}
    variant={isActive ? 'solid' : 'ghost'}
    colorScheme={isActive ? 'teal' : 'gray'}
    fontWeight='medium'
    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
  >
    {name}
  </Button>
)

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const visibleLinks = Links.filter((link) => {
    if (link.requiredAuth && !user) return false
    if (link.hideWhenAuth && user) return false
    return true
  })

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
          <Image
            src='/assets/IECicon.png'
            alt='Logo Iglesia Evangélica de Cabra'
            boxSize='50px'
          />
        </Link>

        <IconButton
          size='md'
          icon={isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          aria-label='Open Menu'
          display={{ base: 'flex', md: 'none' }}
          justifyContent='center'
          alignItems='center'
          onClick={isOpen ? onClose : onOpen}
          variant='ghost'
          colorScheme='teal'
          _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
        />

        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          {visibleLinks.map((link) => (
            <NavLink
              key={link.name}
              name={link.name}
              path={link.path}
              isActive={location.pathname === link.path}
            />
          ))}

          {user?.role === 'admin' && (
            <Button
              as={Link}
              to='/admin'
              leftIcon={<AiOutlineCrown />}
              colorScheme='yellow'
              variant={location.pathname === '/admin' ? 'solid' : 'outline'}
              boxShadow='0 0 8px 2px #ECC94B'
              borderWidth={location.pathname === '/admin' ? 2 : 1}
              borderColor='yellow.400'
              fontWeight='bold'
              _hover={{
                bg: 'yellow.300',
                color: 'gray.800',
                boxShadow: '0 0 16px 4px #ECC94B'
              }}
            >
              Admin
            </Button>
          )}

          {user && (
            <Button onClick={handleLogout} colorScheme='red' variant='ghost'>
              Cerrar sesión
            </Button>
          )}
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack spacing={2}>
            {visibleLinks.map((link) => (
              <NavLink
                key={link.name}
                name={link.name}
                path={link.path}
                isActive={location.pathname === link.path}
              />
            ))}
            {user?.role === 'admin' && (
              <Button
                as={Link}
                to='/admin'
                leftIcon={<AiOutlineCrown />}
                colorScheme='yellow'
                variant={location.pathname === '/admin' ? 'solid' : 'outline'}
                boxShadow='0 0 8px 2px #ECC94B'
                borderWidth={location.pathname === '/admin' ? 2 : 1}
                borderColor='yellow.400'
                fontWeight='bold'
                _hover={{
                  bg: 'yellow.300',
                  color: 'gray.800',
                  boxShadow: '0 0 16px 4px #ECC94B'
                }}
              >
                Admin
              </Button>
            )}
            {user && (
              <Button onClick={handleLogout} colorScheme='red' variant='ghost'>
                Cerrar sesión
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default Navbar
