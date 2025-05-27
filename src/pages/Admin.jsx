import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  VStack,
  Text,
  Button,
  useToast,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/AuthContext'

const Admin = () => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newSerie, setNewSerie] = useState({
    title: '',
    description: '',
    image: ''
  })

  const fetchSeries = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/series`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setSeries(res.data)
    } catch {
      toast({
        title: 'Error al cargar las series',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setLoading(false)
    }
  }, [user.token, toast])

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta serie?'))
      return

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/series/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      // Eliminar la serie del estado
      setSeries((prevSeries) => prevSeries.filter((serie) => serie._id !== id))
    } catch (error) {
      console.error('Error al eliminar la serie:', error)
    }
  }

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/series`,
        newSerie,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      setSeries([...series, res.data])
      onClose()
      toast({
        title: 'Serie creada',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch {
      toast({
        title: 'Error al crear la serie',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    fetchSeries()
  }, [fetchSeries])

  return (
    <Box>
      <Heading mb={6}>Panel de Administración</Heading>
      <Button onClick={onOpen} colorScheme='teal' mb={4}>
        Crear nueva serie
      </Button>

      {loading ? (
        <Spinner size='xl' />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {series.map((serie) => (
            <Box key={serie._id} bg='white' p={4} shadow='md' borderRadius='lg'>
              <Image
                src={serie.image}
                alt={serie.title}
                borderRadius='md'
                objectFit='cover'
                w='100%'
                h='200px'
              />
              <VStack align='start' mt={3}>
                <Heading size='md'>{serie.title}</Heading>
                <Text fontSize='sm'>{serie.description}</Text>
                <Button
                  colorScheme='red'
                  size='sm'
                  onClick={() => handleDelete(serie._id)}
                >
                  Eliminar
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear nueva serie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Título</FormLabel>
              <Input
                value={newSerie.title}
                onChange={(e) =>
                  setNewSerie({ ...newSerie, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Descripción</FormLabel>
              <Input
                value={newSerie.description}
                onChange={(e) =>
                  setNewSerie({ ...newSerie, description: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Imagen (URL)</FormLabel>
              <Input
                value={newSerie.image}
                onChange={(e) =>
                  setNewSerie({ ...newSerie, image: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleCreate}>
              Crear
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Admin
