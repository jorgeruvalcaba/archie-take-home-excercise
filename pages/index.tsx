import { useState, ChangeEvent, useMemo, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { Container, Center, SimpleGrid, Box } from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { debounce } from 'lodash'

import client from '../graphql/client'
import { Header } from '../components/Header'
import Logo from '../public/spacex-white.svg'
import { LAUNCHES_QUERY } from '../graphql/gql/launches'
import {
  DEFAULT_ALT,
  DEFAULT_CARD_IMAGE,
  DEFAULT_MISSION_NAME,
  DEFAULT_ROCKET_NAME,
  DEFAULT_SITE_NAME,
  DEFAULT_YOUTUBE_LINK,
} from '../constants/dashboard'
import { LaunchesPastQuery } from '../graphql/types/graphql'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Loader } from '../components/Loader'
import { Search } from '../components/Search'
import { Empty } from '../components/Empty'

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

      <Search value={searchValue} onChange={handleChange} />

      {loading ? <Loader /> : null}

      {data?.launchesPast && data.launchesPast.length === 0 ? (
        <Empty value={searchValue} />
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
                  alt={launchPast?.mission_name ?? DEFAULT_ALT}
                  mission={launchPast?.mission_name ?? DEFAULT_MISSION_NAME}
                  siteName={
                    launchPast?.launch_site?.site_name_long ?? DEFAULT_SITE_NAME
                  }
                  date={formattedDate}
                  youtubeLink={
                    launchPast?.links?.video_link ?? DEFAULT_YOUTUBE_LINK
                  }
                  rocketName={
                    launchPast?.rocket?.rocket_name ?? DEFAULT_ROCKET_NAME
                  }
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
