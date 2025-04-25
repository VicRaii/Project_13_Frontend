// src/pages/Series.jsx
import React, { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Button,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Series = () => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSeries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/series`)
      setSeries(res.data)
    } catch (err) {
      console.error('Error fetching series:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSeries()
  }, [])

  return (
    <Box p={6} textAlign={'center'}>
      <Heading mb={6}>Series de Predicaciones</Heading>
      {loading ? (
        <Spinner size='xl' />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {series.map((serie) => (
            <Box
              key={serie._id}
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
              p={4}
              bg='white'
              shadow='md'
            >
              <Image
                src={serie.image}
                alt={serie.title}
                borderRadius='md'
                objectFit='cover'
                w='100%'
                h='200px'
              />
              <VStack align='center' mt={4} spacing={2}>
                <Heading size='md'>{serie.title}</Heading>
                <Text fontSize='sm'>{serie.description}</Text>
                <Button
                  as={Link}
                  to={`/series/${serie._id}`}
                  colorScheme='teal'
                  variant='solid'
                  size='sm'
                >
                  Ver predicaciones
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}

export default Series
