import { ChangeEventHandler } from 'react'
import { Input } from '@chakra-ui/react'

type SearchProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const Search = ({ value, onChange }: SearchProps) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder="Search for the mission"
      size="lg"
      width="70%"
      color="black"
      background="white"
      marginBottom={20}
    />
  )
}
