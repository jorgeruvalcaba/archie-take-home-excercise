import { Center, Heading } from '@chakra-ui/react'

type EmptyProps = {
  value: string
}

export const Empty = ({ value }: EmptyProps) => {
  return (
    <Center width="full" height="container.md">
      <Heading as="h2" size="xl" textAlign="center" color="white">
        {`No missions found with name ${value}`}
      </Heading>
    </Center>
  )
}
