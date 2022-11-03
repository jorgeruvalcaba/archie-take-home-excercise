import { gql } from '@apollo/client'

export const LAUNCHES_QUERY = gql`
  query launchesPast($limit: Int, $find: LaunchFind) {
    launchesPast(limit: $limit, find: $find) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        flickr_images
      }
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`
