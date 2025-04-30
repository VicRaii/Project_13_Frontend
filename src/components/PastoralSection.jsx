import { Box, VStack, Heading, Image, Text } from '@chakra-ui/react'

export const PastoralSection = () => (
  <Box p={6} bg='white'>
    <VStack spacing={4} textAlign='center'>
      <Heading size='lg' color='teal.600'>
        Nuestra Familia Pastoral
      </Heading>
      <Image
        src='/assets/FamiliaPastoral.png'
        alt='Familia Pastoral'
        borderRadius='lg'
        boxSize={{ base: '300px', md: '500px' }}
        objectFit='contain'
      />
      <Text fontSize='md' color='gray.600' maxW='600px'>
        La familia pastoral está comprometida con guiar y servir a nuestra
        comunidad con amor, fe y dedicación.
      </Text>
    </VStack>
  </Box>
)
