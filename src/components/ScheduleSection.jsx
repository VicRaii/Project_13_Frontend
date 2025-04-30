import { Box, VStack, Heading, Text } from '@chakra-ui/react'

export const ScheduleSection = () => (
  <Box
    p={20}
    bg='gray.50'
    backgroundImage="url('/assets/HorariosBG.jpg')"
    backgroundSize='cover'
    backgroundPosition='center bottom'
    backgroundRepeat='no-repeat'
  >
    <VStack
      spacing={4}
      textAlign='center'
      bg='whiteAlpha.600'
      p={6}
      borderRadius='lg'
    >
      <Heading size='lg' color='teal.600'>
        Horarios de Reuniones
      </Heading>
      <Text>
        <strong>Domingo:</strong> 11:00h y 19:00h
      </Text>
      <Text>
        <strong>Martes:</strong> 20:00h
      </Text>
    </VStack>
  </Box>
)
