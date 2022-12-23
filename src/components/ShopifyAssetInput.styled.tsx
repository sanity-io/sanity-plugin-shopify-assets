import {Stack} from '@sanity/ui'
import styled from 'styled-components'

export const Search = styled(Stack)`
  position: sticky;
  top: 0;
  z-index: 1;
`

export const Scroller = styled.div`
  overflow-y: auto;
  max-height: 80vh;
`
