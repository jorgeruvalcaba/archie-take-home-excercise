import {
  Box,
  LinkBox,
  LinkOverlay,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { GoLocation, GoRocket } from 'react-icons/go'

import { DEFAULT_CARD_IMAGE } from '../../constants/dashboard'

type CardProps = {
  imgSrc: string | null
  alt: string
  mission: string
  siteName: string
  date: string
  rocketName: string
  youtubeLink: string
}

export const Card = ({
  imgSrc,
  alt,
  mission,
  siteName,
  date,
  youtubeLink,
  rocketName,
}: CardProps) => (
  <Center py={12}>
    <LinkBox
      role="group"
      p={6}
      maxW="330px"
      minW="280px"
      w="full"
      bg="white"
      boxShadow="2xl"
      rounded="lg"
      pos="relative"
      zIndex={1}
    >
      <Box
        rounded="lg"
        mt={-12}
        pos="relative"
        height="230px"
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(${imgSrc})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}
      >
        <Image
          rounded="lg"
          height={230}
          width={282}
          objectFit="cover"
          src={imgSrc ?? DEFAULT_CARD_IMAGE}
          alt={`${alt} image`}
        />
      </Box>
      <Stack pt={10}>
        <Text color="gray.500" fontSize="xs" textAlign="left">
          {date}
        </Text>
        <Heading
          fontSize="xl"
          fontFamily="body"
          fontWeight={500}
          paddingBottom="3"
        >
          <LinkOverlay href={youtubeLink} isExternal>
            {mission}
          </LinkOverlay>
        </Heading>

        <Flex
          alignItems="baseline"
          color="blackAlpha.700"
          fontSize="sm"
          marginTop="12"
          justify="center"
        >
          <Icon as={GoLocation} mr="1" />
          {siteName}
        </Flex>

        <Flex
          alignItems="baseline"
          color="blackAlpha.700"
          fontSize="sm"
          marginTop="12"
        >
          <Icon as={GoRocket} mr="1" />
          {rocketName}
        </Flex>
      </Stack>
    </LinkBox>
  </Center>
)
