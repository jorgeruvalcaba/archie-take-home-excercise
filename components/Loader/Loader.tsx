import { Center, Spinner } from '@chakra-ui/react'

export const Loader = () => (
  <Center w="full" h="full" bg="black" height={40}>
    <Spinner size="xl" color="white" />
  </Center>
)
