import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.spacex.land/graphql/',
  documents: ['pages/**/*.tsx', 'graphql/gql/*.ts'],
  generates: {
    './graphql/types/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
