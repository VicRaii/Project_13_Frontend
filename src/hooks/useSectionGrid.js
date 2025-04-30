import { useBreakpointValue } from '@chakra-ui/react'

export const useSectionGrid = () => {
  return useBreakpointValue({ base: 1, sm: 2, md: 3 })
}
