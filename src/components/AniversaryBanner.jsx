import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export const AnniversaryBanner = () => (
  <Box
    backgroundImage='/assets/47AniversarioBG1.png'
    backgroundPosition='center'
    backgroundSize='cover'
    filter='opacity(0.8)'
    p={6}
    my={6}
  >
    <Box
      bg='blackAlpha.700'
      color='white'
      textAlign='center'
      borderRadius='lg'
      p={6}
    >
      <Heading size='lg' mb={4}>
        ¡Celebramos 47 Años de Fe y Comunidad!
      </Heading>
      <Text fontSize='md' maxW='600px' mx='auto'>
        Este año celebramos 47 años de compartir el mensaje de amor de Cristo.
        ¡Gracias por ser parte!
      </Text>
      <Button mt={5} colorScheme='teal' size='lg' as={RouterLink} to='/about'>
        Conócenos
      </Button>
    </Box>
  </Box>
)
