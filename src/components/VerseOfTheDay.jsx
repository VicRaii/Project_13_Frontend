import { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Heading,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react'

const VerseOfTheDay = ({ apiKey }) => {
  const [verseData, setVerseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BIBLE_ID = '482ddd53705278cc-01'
  const VERSES = [
    'JER.29.11',
    'PSA.23',
    '1COR.4.4-8',
    'PHP.4.13',
    'JHN.3.16',
    'ROM.8.28',
    'ISA.41.10',
    'PSA.46.1',
    'GAL.5.22-23',
    'HEB.11.1',
    '2TI.1.7',
    '1COR.10.13',
    'PRO.22.6',
    'ISA.40.31',
    'JOS.1.9',
    'HEB.12.2',
    'MAT.11.28',
    'ROM.10.9-10',
    'PHP.2.3-4',
    'MAT.5.43-44'
  ]

  const verseIndex = new Date().getDate() % VERSES.length
  const verseID = VERSES[verseIndex]

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/passages/${verseID}`,
          {
            headers: {
              'api-key': apiKey
            }
          }
        )

        const result = await response.json()
        if (!result || !result.data || !result.data.content) {
          throw new Error('No se encontró el versículo.')
        }
        const passage = result.data

        setVerseData({
          reference: passage.reference,
          content: passage.content
        })
      } catch (err) {
        console.error(err)
        setError('Error al obtener el versículo.')
      } finally {
        setLoading(false)
      }
    }

    fetchVerse()
  }, [apiKey, verseID])

  const bgColor = useColorModeValue('gray.100', 'gray.700')

  if (loading) return <Spinner mt={10} color='teal.500' />
  if (error) return <Text color='red.500'>{error}</Text>

  return (
    <Box bg={bgColor} borderRadius='lg' p={8} my={10} textAlign='center'>
      <Heading size='lg' color='teal.600' mb={4}>
        Versículo del Día
      </Heading>
      <Text fontStyle='italic' fontSize='lg' color='gray.800' mb={2}>
        "{verseData.content.replace(/<\/?[^>]+(>|$)/g, '')}"
      </Text>
      <Text fontWeight='bold' color='gray.600'>
        — {verseData.reference}
      </Text>
    </Box>
  )
}

export default VerseOfTheDay
