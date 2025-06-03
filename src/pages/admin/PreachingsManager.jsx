import {
  Box,
  Heading,
  Button,
  useToast,
  Flex,
  Text,
  Spinner,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Select
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import PreachingForm from './PreachingForm'
import { getToken } from '../../utils/token'

const PreachingsManager = () => {
  const [preachings, setPreachings] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingPreaching, setEditingPreaching] = useState(null)
  const [preachingToDelete, setPreachingToDelete] = useState(null)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const formRef = useRef(null)

  const fetchPreachings = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/preachings`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      const data = await res.json()

      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPreachings(sorted)
    } catch {
      toast({ title: 'Error al cargar las predicaciones', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = (preaching) => {
    setPreachingToDelete(preaching)
    onOpen()
  }

  const deletePreaching = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/preachings/${preachingToDelete._id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      )
      if (res.ok) {
        toast({ title: 'Predicación eliminada', status: 'success' })
        fetchPreachings()
      } else {
        toast({ title: 'Error al eliminar', status: 'error' })
      }
    } catch {
      toast({ title: 'Error al eliminar', status: 'error' })
    } finally {
      onClose()
      setPreachingToDelete(null)
    }
  }

  const [selectedSeries, setSelectedSeries] = useState('')

  useEffect(() => {
    fetchPreachings()
  }, [])

  const filteredPreachings = selectedSeries
    ? preachings.filter(
        (p) => (p.series?.title || 'Sin serie') === selectedSeries
      )
    : preachings

  const groupedPreachings = filteredPreachings.reduce((acc, p) => {
    const key = p.series?.title || 'Sin serie'
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {})

  const uniqueSeries = [
    ...new Set(preachings.map((p) => p.series?.title || 'Sin serie'))
  ]

  return (
    <Box>
      <Heading size='lg' mb={4}>
        Gestión de Predicaciones
      </Heading>

      <PreachingForm
        ref={formRef}
        preaching={editingPreaching}
        onSaved={() => {
          fetchPreachings()
          setSelectedSeries('')
        }}
        onCancel={() => setEditingPreaching(null)}
      />

      <Box mb={4}>
        <Select
          placeholder='Filtrar por serie'
          value={selectedSeries}
          onChange={(e) => setSelectedSeries(e.target.value)}
          maxW='300px'
        >
          <option value=''>Todas las series</option>
          {uniqueSeries.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Spinner size='lg' />
      ) : (
        <Box mt={6}>
          {Object.entries(groupedPreachings).map(
            ([seriesTitle, preachingsInGroup]) => (
              <Box key={seriesTitle} mb={8}>
                <Heading size='md' mb={4}>
                  {seriesTitle}
                </Heading>
                <Stack spacing={4}>
                  {preachingsInGroup.map((p) => (
                    <Box
                      key={p._id}
                      p={4}
                      bg='white'
                      shadow='md'
                      borderRadius='md'
                    >
                      <Flex justify='space-between' align='center'>
                        <Box>
                          <Text fontWeight='bold'>{p.title}</Text>
                          <Text>
                            {p.preacher} -{' '}
                            {new Date(p.date).toLocaleDateString()}
                          </Text>
                        </Box>
                        <Flex gap={2}>
                          <Button
                            colorScheme='blue'
                            onClick={() => {
                              setEditingPreaching(p)
                              setTimeout(() => {
                                formRef.current?.scrollIntoView({
                                  behavior: 'smooth'
                                })
                              }, 100)
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            colorScheme='red'
                            onClick={() => confirmDelete(p)}
                          >
                            Eliminar
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )
          )}
        </Box>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirmar eliminación
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que deseas eliminar esta predicación? Esta acción no
              se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={deletePreaching} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default PreachingsManager
