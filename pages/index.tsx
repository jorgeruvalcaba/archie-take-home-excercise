import { useState, ChangeEvent, useCallback, useEffect } from 'react'
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
import _ from 'lodash'

import client from '../graphql/client'
import { Header } from '../components/Header'
import Logo from '../public/spacex-white.svg'
import { LAUNCHES_QUERY } from '../graphql/gql/launches'
import {
  PAGE_SIZE,
  TOTAL_LAUNCHES,
  DEFAULT_CARD_IMAGE,
} from '../constants/dashboard'
import { LaunchesPastQuery } from '../graphql/types/graphql'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'

export default function Home() {
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const { loading, error, data, refetch } = useQuery<LaunchesPastQuery>(
    LAUNCHES_QUERY,
    {
      client,
      variables: {
        // limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
        find: {
          mission_name: searchValue,
        },
      },
    }
  )
  const debouncer = useCallback(_.debounce(refetch, 1000), [])

  useEffect(() => {
    const refetchData = setTimeout(() => {
      debouncer()
    }, 1500)

    return () => clearTimeout(refetchData)
  }, [searchValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value)

  console.log({ data, searchValue })

  const pageNum = Math.ceil(TOTAL_LAUNCHES / PAGE_SIZE)
  const isLastPage = page + 1 === pageNum

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

      {/* <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button disabled={!page} onClick={() => setPage((prev) => prev - 1)}>
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button
          disabled={isLastPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </nav> */}

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
