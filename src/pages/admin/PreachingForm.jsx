import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { getToken } from '../../utils/token'
import { forwardRef } from 'react'

const PreachingForm = forwardRef(({ preaching, onSaved, onCancel }, ref) => {
  const [title, setTitle] = useState('')
  const [preacher, setPreacher] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [series, setSeries] = useState('')
  const [seriesOptions, setSeriesOptions] = useState([])
  const titleInputRef = useRef(null)

  const toast = useToast()

  useEffect(() => {
    if (preaching) {
      setTitle(preaching.title)
      setPreacher(preaching.preacher || '')
      setDate(preaching.date ? preaching.date.split('T')[0] : '')
      setContent(preaching.content || '')
      setVideoUrl(preaching.videoUrl || '')
      setSeries(preaching.series?._id || '')
    } else {
      setTitle('')
      setPreacher('')
      setDate('')
      setContent('')
      setVideoUrl('')
      setSeries('')
    }

    setTimeout(() => {
      titleInputRef.current?.focus()
    }, 100)
  }, [preaching])

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/series`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        const data = await res.json()
        setSeriesOptions(data)
      } catch {
        toast({ title: 'Error al cargar las series', status: 'error' })
      }
    }

    fetchSeries()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { title, preacher, date, content, videoUrl, series }

    const method = preaching ? 'PUT' : 'POST'
    const url = preaching
      ? `${import.meta.env.VITE_API_URL}/preachings/${preaching._id}`
      : `${import.meta.env.VITE_API_URL}/preachings`

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
        title: preaching ? 'Predicación actualizada' : 'Predicación creada',
        description: `La predicación "${data.title || title}" se ha ${
          preaching ? 'actualizado' : 'creado'
        } correctamente.`,
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      if (!preaching) {
        setTitle('')
        setPreacher('')
        setDate('')
        setContent('')
        setVideoUrl('')
        setSeries('')
      }

      onSaved()
      if (preaching && onCancel) onCancel()
    } else {
      toast({
        title: 'Error',
        description: 'No se pudo guardar la predicación.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box
      as='form'
      ref={ref}
      onSubmit={handleSubmit}
      mb={6}
      bg='white'
      p={4}
      shadow='md'
      borderRadius='md'
    >
      <FormControl mb={4} isRequired>
        <FormLabel>Título</FormLabel>
        <Input
          ref={titleInputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Predicador</FormLabel>
        <Input value={preacher} onChange={(e) => setPreacher(e.target.value)} />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Fecha</FormLabel>
        <Input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Contenido</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>URL del Video</FormLabel>
        <Input
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder='https://...'
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Serie</FormLabel>
        <Select
          placeholder='Selecciona una serie'
          value={series}
          onChange={(e) => setSeries(e.target.value)}
        >
          {seriesOptions.map((s) => (
            <option key={s._id} value={s._id}>
              {s.title}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button type='submit' colorScheme='teal' mr={2}>
        {preaching ? 'Actualizar' : 'Crear'}
      </Button>
      {preaching && (
        <Button onClick={onCancel} variant='outline'>
          Cancelar
        </Button>
      )}
    </Box>
  )
})

export default PreachingForm
