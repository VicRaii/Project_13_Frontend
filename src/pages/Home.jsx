import {
  Box,
  Text,
  Button,
  SimpleGrid,
  Image,
  useBreakpointValue,
  VStack,
  Heading
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaFilm, FaInfoCircle, FaEnvelope } from 'react-icons/fa'

const Home = () => {
  const sections = [
    {
      title: 'Series',
      icon: FaFilm,
      image: '/assets/SeriesBento.png',
      link: '/series'
    },
    {
      title: 'Conócenos',
      icon: FaInfoCircle,
      image: '/assets/AboutBento.png',
      link: '/about'
    },
    {
      title: 'Contacto',
      icon: FaEnvelope,
      image: '/assets/ContactBento.png',
      link: '/contact'
    }
  ]

  const gridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 })

  return (
    <>
      {/* Hero Section */}
      <Box
        position='relative'
        height={{ base: '50vh', md: '60vh' }}
        overflow='hidden'
        borderRadius='lg'
      >
        {/* Video de fondo */}
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

        {/* Overlay con contenido */}
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

      {/* Familia Pastoral Section */}
      <Box p={6} bg='white'>
        <VStack spacing={4} textAlign='center'>
          <Heading size='lg' color='teal.600'>
            Nuestra Familia Pastoral
          </Heading>
          <Image
            src='/assets/FamiliaPastoral.jpg'
            alt='Familia Pastoral'
            borderRadius='lg'
            boxSize={{ base: '300px', md: '400px' }}
            objectFit='cover'
          />
          <Text fontSize='md' color='gray.600' maxW='600px'>
            La familia pastoral de nuestra iglesia está comprometida con guiar y
            servir a nuestra comunidad con amor, fe y dedicación. Su misión es
            inspirar a otros a vivir una vida centrada en Cristo.
          </Text>
        </VStack>
      </Box>

      {/* Sección del 45 Aniversario */}
      <Box
        backgroundImage={'/assets/47AniversarioBG1.png'}
        backgroundPosition={'center'}
        backgroundSize={'cover'}
        filter={'opacity(0.8)'}
        p={6}
        mt={6}
        mb={6}
      >
        <Box
          p={6}
          bg='blackAlpha.700'
          color='white'
          textAlign='center'
          borderRadius='lg'
          mb={6}
        >
          <Heading size='lg' mb={4}>
            ¡Celebramos 47 Años de Fe y Comunidad!
          </Heading>
          <Text fontSize='md' maxW='600px' mx='auto'>
            Este año, nuestra iglesia celebra 45 años de compartir el mensaje de
            esperanza y amor de Cristo. Agradecemos a Dios por su fidelidad y a
            cada miembro por ser parte de esta familia espiritual.
          </Text>
          <Button
            mt={5}
            colorScheme='teal'
            size='lg'
            as={RouterLink}
            to='/about'
          >
            Conócenos
          </Button>
        </Box>
      </Box>

      {/* Horarios Section */}
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
          <Text fontSize='md' color='gray.800'>
            <strong>Domingo:</strong> Culto de adoración - 11:00h; Segundo culto
            de adoración - 19:00h
          </Text>

          <Text fontSize='md' color='gray.800'>
            <strong>Martes:</strong> Culto de oración - 20:00h
          </Text>
        </VStack>
      </Box>

      {/* Bento Section */}
      <Box p={6} bg='gray.50'>
        <SimpleGrid columns={gridColumns} spacing={8}>
          {sections.map((section, index) => (
            <Box
              key={index}
              as={RouterLink}
              to={section.link}
              textAlign='center'
              p={6}
              bg='white'
              borderRadius='lg'
              boxShadow='lg'
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '2xl',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <Image
                src={section.image}
                alt={section.title}
                boxSize='200px'
                objectFit='cover'
                borderRadius='full'
                mb={6}
              />
              <Text fontSize='xl' fontWeight='bold' color='teal.600'>
                {section.title}
              </Text>
              <Text mt={2} fontSize='md' color='gray.600'>
                Descubre más sobre esta sección.
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      {/* Información antes del footer */}
      <Box bg='gray.50' py={10} px={6}>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={30}
          alignItems='center'
          textAlign='center'
        >
          {/* Columna 1: Bienvenida */}
          <Box>
            <Image
              src='/assets/IECicon2.png' // Cambia por la ruta de tu logo
              alt='Logo Iglesia'
              mx='auto'
              mb={4}
              boxSize='100px'
              objectFit='contain'
            />
            <Text fontSize='md' color='gray.600'>
              Bienvenido a tu casa, bienvenido al lugar donde conocerás un
              mensaje de esperanza que transforma vidas.
            </Text>
          </Box>

          {/* Columna 3: Contactar */}
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
              <a
                href='mailto:iglesiaevangelicacabra@gmail.com'
                style={{ color: 'teal' }}
              >
                iglesiaevangelicacabra@gmail.com
              </a>
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  )
}

export default Home
