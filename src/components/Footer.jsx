import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
  Image,
  Heading,
  HStack,
  Link,
  IconButton
} from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const FooterContent = () => (
  <Box bg={useColorModeValue('gray.50', 'gray.800')} py={10} px={6}>
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      spacing={10}
      alignItems='flex-start'
      textAlign='center'
    >
      <Box>
        <Image
          src='/assets/IECicon2.png'
          alt='Logo Iglesia'
          mx='auto'
          mb={4}
          boxSize='100px'
          objectFit='contain'
        />
        <Text fontSize='md' color='gray.600'>
          Bienvenido a tu casa, bienvenido al lugar donde conocerás un mensaje
          de esperanza.
        </Text>
      </Box>

      <Box>
        <HStack spacing={4} flexDirection={'column'} justifyContent='center'>
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

      <Box>
        <Heading size='md' color='teal.600' mb={4}>
          Contactar
        </Heading>
        <Text fontSize='md' color='gray.600'>
          Antiguo Centro Cívico de la Barriada, Final de la Calle San Isidro
          s/n,
          <br />
          Cabra, Spain, 14940
          <br />
          +34 696 331 326
          <br />
          <Link href='mailto:iglesiaevangelicacabra@gmail.com' color='teal'>
            iglesiaevangelicacabra@gmail.com
          </Link>
        </Text>
      </Box>
    </SimpleGrid>
  </Box>
)

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <FooterContent />
      <Box
        borderTopWidth={1}
        borderStyle='solid'
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container as={Stack} maxW='6xl' py={4} textAlign='center'>
          <Text>
            © {new Date().getFullYear()} Iglesia Evangélica de Cabra. Todos los
            derechos reservados.
          </Text>
        </Container>
      </Box>
    </Box>
  )
}
