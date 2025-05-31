import {
  Box,
  Heading,
  Button,
  useToast,
  Flex,
  Text,
  Spinner,
  Stack,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import SeriesForm from '../../components/SeriesForm'
import { getToken } from '../../utils/token'

const SeriesManager = () => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingSeries, setEditingSeries] = useState(null)
  const [selectedSeries, setSelectedSeries] = useState(null)
  const formRef = useRef(null)
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const fetchSeries = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/series`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      const data = await res.json()
      setSeries(data)
    } catch {
      toast({ title: 'Error al cargar las series', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = (serie) => {
    setSelectedSeries(serie)
    onOpen()
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/series/${selectedSeries._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      )
      if (res.ok) {
        toast({ title: 'Serie eliminada', status: 'success' })
        fetchSeries()
      } else {
        toast({ title: 'Error al eliminar', status: 'error' })
      }
    } catch {
      toast({ title: 'Error al eliminar', status: 'error' })
    } finally {
      onClose()
      setSelectedSeries(null)
    }
  }

  useEffect(() => {
    fetchSeries()
  }, [])

  return (
    <Box>
      <Heading size='lg' mb={4}>
        Gestión de Series
      </Heading>

      <Box ref={formRef}>
        <SeriesForm
          onSaved={fetchSeries}
          series={editingSeries}
          onCancel={() => setEditingSeries(null)}
        />
      </Box>

      {loading ? (
        <Spinner size='lg' />
      ) : (
        <Stack mt={6} spacing={4}>
          {series.map((s) => (
            <Box key={s._id} p={4} bg='white' shadow='md' borderRadius='md'>
              <Flex justify='space-between' align='center'>
                <Box>
                  <Text fontWeight='bold'>{s.title}</Text>
                  <Text>{s.description}</Text>
                </Box>
                <Flex gap={2}>
                  <Button
                    colorScheme='blue'
                    onClick={() => {
                      setEditingSeries(s)
                      setTimeout(() => {
                        const topOffset = formRef.current?.offsetTop || 0
                        window.scrollTo({
                          top: topOffset - 60,
                          behavior: 'smooth'
                        })
                      }, 100)
                    }}
                  >
                    Editar
                  </Button>
                  <Button colorScheme='red' onClick={() => confirmDelete(s)}>
                    Eliminar
                  </Button>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar serie
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres eliminar la serie "
              {selectedSeries?.title}"? Esta acción no se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default SeriesManager
