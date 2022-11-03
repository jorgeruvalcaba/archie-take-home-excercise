import { Center, Link } from '@chakra-ui/react'

export const Footer = () => (
  <Center backgroundColor="black" height="100px" color="white">
    <span>
      Archie&apos;s Coding Exercise by{' '}
      <Link href="https://twitter.com/jorgearuv" isExternal>
        @jorgearuv
      </Link>
      . ®{new Date().getFullYear()}
    </span>
  </Center>
)
