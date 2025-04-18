import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
  Center
} from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'

const getYoutubeThumbnail = (url) => {
  const match = url?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/|v\/|shorts\/|playlist\?list=))([a-zA-Z0-9_-]{11})/
  )
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

const getYoutubeEmbedUrl = (url) => {
  const match = url?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/|v\/|shorts\/|playlist\?list=))([a-zA-Z0-9_-]{11})/
  )
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

const SeriesCard = ({ title, date, preacher, content, videoUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const thumbnail = getYoutubeThumbnail(videoUrl)
  const embedUrl = getYoutubeEmbedUrl(videoUrl)

  return (
    <>
      <Box
        p={4}
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='md'
        bg='white'
        textAlign={'center'}
        _hover={{ boxShadow: 'lg' }}
      >
        {thumbnail && (
          <Box position='relative' onClick={onOpen} cursor='pointer'>
            <Image
              src={thumbnail}
              alt={title}
              borderRadius='md'
              mb={3}
              w='100%'
              h='200px'
              objectFit='cover'
            />
            <Center position='absolute' top='0' left='0' w='100%' h='100%'>
              <IconButton
                icon={<FaPlay />}
                colorScheme='red'
                isRound
                size='lg'
                aria-label='Reproducir video'
              />
            </Center>
          </Box>
        )}
        <Heading size='md' mb={2}>
          {title}
        </Heading>
        <Text fontSize='sm' color='gray.600'>
          {preacher} {new Date(date).toLocaleDateString()}
        </Text>
        <Text mt={2} noOfLines={3}>
          {content}
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0}>
            <Box
              as='iframe'
              src={embedUrl}
              width='100%'
              height='400px'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title={title}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SeriesCard
