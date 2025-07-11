import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  AspectRatio,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Center,
  Icon
} from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'

const getYoutubeThumbnail = (url) => {
  const match = url?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/
  )
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

const getYoutubeEmbedUrl = (url) => {
  const match = url?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/
  )
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null
}

const SeriesCard = ({ title, date, preacher, description, videoUrl }) => {
  const thumbnail = getYoutubeThumbnail(videoUrl)
  const embedUrl = getYoutubeEmbedUrl(videoUrl)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        border='2px solid red'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        height='100%'
        borderWidth='1px'
        borderRadius='xl'
        boxShadow='md'
        bg='white'
        p={4}
        transition='all 0.2s ease'
        _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
        cursor='pointer'
        onClick={onOpen}
      >
        <Box position='relative'>
          <Image
            src={thumbnail}
            alt={`Miniatura de ${title}`}
            borderTopRadius='xl'
            w='100%'
            h='200px'
            objectFit='cover'
          />
          <Center
            position='absolute'
            top='0'
            left='0'
            w='100%'
            h='100%'
            bg='rgba(0, 0, 0, 0.3)'
            borderRadius='inherit'
            opacity={0}
            _hover={{ opacity: 1 }}
            transition='opacity 0.3s'
          >
            <Icon as={FaPlay} color='white' boxSize={10} />
          </Center>
        </Box>

        <VStack align='start' spacing={2} flex='1'>
          <Heading size='md'>{title}</Heading>
          <Text fontSize='sm' color='gray.600'>
            {preacher} – {new Date(date).toLocaleDateString()}
          </Text>
          <Text fontSize='sm' color='gray.700' noOfLines={3} minH='60px'>
            {description}
          </Text>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl' isCentered>
        <ModalOverlay />
        <ModalContent bg='black'>
          <ModalCloseButton color='white' />
          <AspectRatio ratio={16 / 9} w='100%'>
            <iframe
              title={title}
              src={embedUrl}
              allowFullScreen
              allow='autoplay'
            />
          </AspectRatio>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SeriesCard
