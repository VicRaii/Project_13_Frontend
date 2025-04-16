import { Box, Image, Heading, Text } from '@chakra-ui/react'

const SeriesCard = ({ image, title, description }) => (
  <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p={4}>
    {image && <Image src={image} alt={title} borderRadius='md' />}
    <Heading size='md' mt={2}>
      {title}
    </Heading>
    <Text mt={2} color='gray.600'>
      {description}
    </Text>
  </Box>
)

export default SeriesCard
