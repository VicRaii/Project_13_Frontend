import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Badge,
  Spinner,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import { getToken } from '../../utils/token'

const ContactsManager = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)

  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      const data = await res.json()
      setContacts(data)
    } catch {
      toast({ title: 'Error al cargar los mensajes', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/contact/${id}/read`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      )
      if (res.ok) {
        toast({ title: 'Mensaje marcado como leído', status: 'success' })
        fetchContacts()
      } else {
        toast({ title: 'Error al actualizar', status: 'error' })
      }
    } catch {
      toast({ title: 'Error de red', status: 'error' })
    }
  }

  const confirmDelete = (contact) => {
    setSelectedContact(contact)
    onOpen()
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/contact/${selectedContact._id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      )
      if (res.ok) {
        toast({ title: 'Mensaje eliminado', status: 'success' })
        fetchContacts()
      } else {
        toast({ title: 'Error al eliminar', status: 'error' })
      }
    } catch {
      toast({ title: 'Error de red', status: 'error' })
    } finally {
      onClose()
      setSelectedContact(null)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const unreadContacts = contacts.filter((c) => !c.read)
  const readContacts = contacts.filter((c) => c.read)

  return (
    <Box>
      <Heading size='lg' mb={4}>
        Mensajes de Contacto
      </Heading>

      {loading ? (
        <Spinner size='lg' />
      ) : (
        <>
          <Heading size='md' mb={3}>
            No leídos ({unreadContacts.length})
          </Heading>
          <Stack spacing={4} mb={6}>
            {unreadContacts.length === 0 ? (
              <Text>No hay mensajes nuevos.</Text>
            ) : (
              unreadContacts.map((c) => (
                <Box key={c._id} p={4} bg='white' shadow='md' borderRadius='md'>
                  <Flex justify='space-between' align='center' gap={3}>
                    <Box>
                      <Text fontWeight='bold'>
                        {c.name} <Badge colorScheme='red'>Nuevo</Badge>
                      </Text>
                      <Text fontSize='sm'>{c.email}</Text>
                      <Text>
                        <strong>Teléfono:</strong>{' '}
                        {c.phone || 'No proporcionado'}
                      </Text>
                      <Text mt={2}>{c.message}</Text>
                    </Box>
                    <Stack>
                      <Button
                        size='sm'
                        colorScheme='green'
                        onClick={() => markAsRead(c._id)}
                      >
                        Marcar como leído
                      </Button>
                      <Button
                        size='sm'
                        colorScheme='red'
                        onClick={() => confirmDelete(c)}
                      >
                        Eliminar
                      </Button>
                    </Stack>
                  </Flex>
                </Box>
              ))
            )}
          </Stack>

          <Divider my={6} />

          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Mensajes leídos ({readContacts.length})
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack spacing={4}>
                  {readContacts.length === 0 ? (
                    <Text>No hay mensajes leídos todavía.</Text>
                  ) : (
                    readContacts.map((c) => (
                      <Box
                        key={c._id}
                        p={4}
                        bg='gray.50'
                        shadow='sm'
                        borderRadius='md'
                      >
                        <Flex justify='space-between' align='center' gap={3}>
                          <Box>
                            <Text fontWeight='bold'>{c.name}</Text>
                            <Text fontSize='sm'>{c.email}</Text>
                            <Text fontSize='sm'>{c.phone}</Text>
                            <Text mt={2}>{c.message}</Text>
                          </Box>
                          <Button
                            size='sm'
                            colorScheme='red'
                            onClick={() => confirmDelete(c)}
                          >
                            Eliminar
                          </Button>
                        </Flex>
                      </Box>
                    ))
                  )}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar mensaje
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar el mensaje de{' '}
              <strong>{selectedContact?.name}</strong>?
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

export default ContactsManager
