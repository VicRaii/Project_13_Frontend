import { useEffect, useState } from 'react'
import { Box, Heading, Text, Spinner, SimpleGrid } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import SeriesCard from './SeriesCard'

const SerieDetail = () => {
  const { id } = useParams()
  const [serie, setSerie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSerie = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/series/${id}`)
        const data = await res.json()
        setSerie(data)
        setLoading(false)
      } catch (err) {
        console.error('Error loading serie:', err)
        setLoading(false)
      }
    }

    fetchSerie()
  }, [id])

  if (loading) {
    return (
      <Box p={6}>
        <Spinner />
      </Box>
    )
  }

  if (!serie) {
    return (
      <Box p={6}>
        <Text>Serie no encontrada</Text>
      </Box>
    )
  }

  return (
    <Box p={6} textAlign={'center'}>
      <Heading mb={4}>{serie.title}</Heading>
      <Text mb={6}>{serie.description}</Text>

      <Heading size='md' mb={4}>
        Predicaciones
      </Heading>

      {serie.preachings?.length ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={6} alignItems='stretch'>
          {serie.preachings.map((preaching) => (
            <Box key={preaching._id} h='100%'>
              <SeriesCard {...preaching} />
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No hay predicaciones en esta serie.</Text>
      )}
    </Box>
  )
}

export default SerieDetail
