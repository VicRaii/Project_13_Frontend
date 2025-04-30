import { Box, Text } from '@chakra-ui/react'

export const HeroSection = () => (
  <Box
    position='relative'
    height={{ base: '90vh', md: '90vh' }}
    overflow='hidden'
    borderRadius='lg'
  >
    <Box
      as='video'
      autoPlay
      muted
      loop
      playsInline
      src='/assets/videoplayback20s.mp4'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0
      }}
    />
    <Box
      position='absolute'
      top='0'
      left='0'
      w='100%'
      h='100%'
      bg='blackAlpha.600'
      zIndex='1'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      color='white'
      textAlign='center'
      px={4}
    >
      <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight='bold'>
        Iglesia Evangélica de Cabra
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} mt={3} maxW='600px'>
        Fe. Esperanza. Vida.
      </Text>
    </Box>
  </Box>
)
