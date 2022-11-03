import { useState, ChangeEvent, useMemo, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import {
  Container,
  Center,
  SimpleGrid,
  Input,
  Spinner,
  Box,
  Heading,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { debounce } from 'lodash'

import client from '../graphql/client'
import { Header } from '../components/Header'
import Logo from '../public/spacex-white.svg'
import { LAUNCHES_QUERY } from '../graphql/gql/launches'
import { DEFAULT_CARD_IMAGE } from '../constants/dashboard'
import { LaunchesPastQuery } from '../graphql/types/graphql'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const { loading, data, refetch } = useQuery<LaunchesPastQuery>(
    LAUNCHES_QUERY,
    {
      client,
      variables: {
        find: {
          mission_name: searchValue,
        },
      },
    }
  )
  const debounceSearch = useMemo(() => debounce(refetch, 750), [refetch])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value)
      debounceSearch()
    },
    [debounceSearch]
  )

  return (
    <Container bg="black" minW="100%" minH="100vh" centerContent>
      <Header />

      <Center>
        <Link href="/">
          <Logo width="300px" height="200px" />
        </Link>
      </Center>

      <Input
        value={searchValue}
        onChange={handleChange}
        placeholder="Search for the mission"
        size="lg"
        width="70%"
        color="black"
        background="white"
        marginBottom={20}
      />

      {loading ? (
        <Center w="full" h="full" bg="black" height={40}>
          <Spinner size="xl" color="white" />
        </Center>
      ) : null}

      {data?.launchesPast && data.launchesPast.length === 0 ? (
        <Center width="full" height="container.md">
          <Heading as="h2" size="xl" textAlign="center" color="white">
            {`No missions found with name ${searchValue}`}
          </Heading>
        </Center>
      ) : null}

      <SimpleGrid columns={{ sm: 2, md: 3, '2xl': 4 }} spacing="8" minW="sm">
        {data?.launchesPast && data.launchesPast.length > 0
          ? data.launchesPast?.map((launchPast) => {
              const date = new Date(launchPast?.launch_date_local || '')
              const formattedDate = format(date, 'PPP')

              return (
                <Card
                  key={launchPast?.id}
                  imgSrc={
                    launchPast?.links?.flickr_images &&
                    launchPast.links.flickr_images.length > 0
                      ? launchPast.links.flickr_images[0]
                      : DEFAULT_CARD_IMAGE
                  }
                  alt={launchPast?.mission_name ?? 'SpaceX image'}
                  mission={launchPast?.mission_name ?? 'SpaceX Mission'}
                  siteName={
                    launchPast?.launch_site?.site_name_long ??
                    'Cape Canaveral Air Force Station Space Launch Complex 40'
                  }
                  date={formattedDate}
                  youtubeLink={
                    launchPast?.links?.video_link ??
                    'https://www.youtube.com/watch?v=-Oox2w5sMcA'
                  }
                  rocketName={launchPast?.rocket?.rocket_name ?? 'Falcon'}
                />
              )
            })
          : null}
      </SimpleGrid>

      <Box bottom={0} position="relative">
        <Footer />
      </Box>
    </Container>
  )
}
