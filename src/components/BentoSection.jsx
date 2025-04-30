import { Box, Image, Text, SimpleGrid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useSectionGrid } from '../hooks/useSectionGrid'

const sections = [
  { title: 'Series', image: '/assets/SeriesBento.png', link: '/series' },
  { title: 'Conócenos', image: '/assets/AboutBento.png', link: '/about' },
  { title: 'Contacto', image: '/assets/ContactBento.png', link: '/contact' }
]

export const BentoSection = () => {
  const columns = useSectionGrid()

  return (
    <Box p={6} bg='gray.50'>
      <SimpleGrid columns={columns} spacing={8}>
        {sections.map((section, idx) => (
          <Box
            key={idx}
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
              transition: '0.3s'
            }}
          >
            <Image
              src={section.image}
              alt={section.title}
              boxSize='200px'
              borderRadius='full'
              mb={6}
              objectFit='cover'
            />
            <Text fontSize='xl' fontWeight='bold' color='teal.600'>
              {section.title}
            </Text>
            <Text fontSize='md' color='gray.600' mt={2}>
              Descubre más sobre esta sección.
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
