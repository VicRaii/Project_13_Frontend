import {
  Box,
  Heading,
  Spinner,
  Stack,
  Text,
  Flex,
  Button,
  Select,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import { getToken } from '../../utils/token'
import { FaCrown } from 'react-icons/fa'

const UsersManager = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      const data = await res.json()
      setUsers(data)
    } catch {
      toast({ title: 'Error al cargar los usuarios', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = (user) => {
    setSelectedUser(user)
    onOpen()
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${selectedUser._id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      )
      if (res.ok) {
        toast({ title: 'Usuario eliminado', status: 'success' })
        fetchUsers()
      } else {
        toast({ title: 'Error al eliminar', status: 'error' })
      }
    } catch {
      toast({ title: 'Error al eliminar', status: 'error' })
    } finally {
      onClose()
      setSelectedUser(null)
    }
  }

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ role: newRole })
      })
      if (res.ok) {
        toast({ title: 'Rol actualizado', status: 'success' })
        fetchUsers()
      } else {
        toast({ title: 'Error al actualizar rol', status: 'error' })
      }
    } catch {
      toast({ title: 'Error al actualizar rol', status: 'error' })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Box>
      <Heading size='lg' mb={4}>
        Gestión de Usuarios
      </Heading>

      {loading ? (
        <Spinner size='lg' />
      ) : (
        <Stack spacing={4}>
          {users.map((user) => (
            <Box key={user._id} p={4} bg='white' shadow='md' borderRadius='md'>
              <Flex justify='space-between' align='center'>
                <Box>
                  <Flex align='center' gap={2}>
                    <Text fontWeight='bold'>{user.userName}</Text>
                    {user.role === 'admin' && (
                      <FaCrown color='gold' title='Administrador' />
                    )}
                  </Flex>

                  <Text>{user.email}</Text>
                  <Text>Rol: {user.role}</Text>
                </Box>
                <Flex gap={2} align='center'>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    size='sm'
                  >
                    <option value='user'>Usuario</option>
                    <option value='admin'>Admin</option>
                  </Select>
                  <Button
                    colorScheme='red'
                    size='sm'
                    onClick={() => confirmDelete(user)}
                  >
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
              Eliminar usuario
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar al usuario "
              {selectedUser?.userName}"? Esta acción no se puede deshacer.
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

export default UsersManager
