import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getToken } from '../utils/token'

const SeriesForm = ({ series, onSaved, onCancel }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const toast = useToast()

  useEffect(() => {
    if (series) {
      setTitle(series.title)
      setDescription(series.description)
      setImage(series.image || '')
    } else {
      setTitle('')
      setDescription('')
      setImage('')
    }
  }, [series])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { title, description, image }

    const method = series ? 'PUT' : 'POST'
    const url = series
      ? `${import.meta.env.VITE_API_URL}/series/${series._id}`
      : `${import.meta.env.VITE_API_URL}/series`

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      const data = await res.json()
      toast({
        title: series ? 'Serie actualizada' : 'Serie creada',
        description: `La serie "${data.title || title}" se ha ${
          series ? 'actualizado' : 'creado'
        } correctamente.`,
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      if (!series) {
        setTitle('')
        setDescription('')
        setImage('')
      }

      onSaved()
      if (series && onCancel) onCancel()
    } else {
      toast({
        title: 'Error',
        description: 'No se pudo guardar la serie.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box
      as='form'
      onSubmit={handleSubmit}
      mb={6}
      bg='white'
      p={4}
      shadow='md'
      borderRadius='md'
    >
      <FormControl mb={4} isRequired>
        <FormLabel>Título</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Link de Imagen</FormLabel>
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='https://...'
        />
        {image && (
          <Image
            src={image}
            alt='Vista previa'
            mt={2}
            maxH='150px'
            objectFit='cover'
            borderRadius='md'
          />
        )}
      </FormControl>

      <Button type='submit' colorScheme='teal' mr={2}>
        {series ? 'Actualizar' : 'Crear'}
      </Button>
      {series && (
        <Button onClick={onCancel} variant='outline'>
          Cancelar
        </Button>
      )}
    </Box>
  )
}

export default SeriesForm
