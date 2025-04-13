import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue
} from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target='_blank'
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>
            © {new Date().getFullYear()} Iglesia Evangélica de Cabra. Todos los
            derechos reservados.
          </Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton
              label={'Facebook'}
              href={'https://www.facebook.com/Iglesiaevangelicadecabra'}
            >
              <FaFacebook />
            </SocialButton>
            <SocialButton
              label={'Instagram'}
              href={'https://www.instagram.com/iglesia_evangelica_de_cabra/'}
            >
              <FaInstagram />
            </SocialButton>
            <SocialButton
              label={'YouTube'}
              href={'https://www.youtube.com/@iglesiaevangelicadecabra8049'}
            >
              <FaYoutube />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
