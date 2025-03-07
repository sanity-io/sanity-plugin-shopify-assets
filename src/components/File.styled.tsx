import {Card} from '@sanity/ui'
import {styled} from 'styled-components'

export const Root = styled.div`
  overflow: hidden;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-clip: border-box;
  background-size: cover;
  background-color: ${({theme}) => theme.sanity.color.card.enabled.bg2};
  position: relative;
  outline: none !important;
  border: ${({theme}) => `1px solid ${theme.sanity.color.card.enabled.border}`};
  box-sizing: content-box;
  user-drag: none;

  &:hover {
    opacity: 0.85;
  }

  &:focus,
  &:active {
    border: 1px solid var(--input-border-color-focus);
    box-shadow: inset 0 0 0 3px var(--input-border-color-focus);
  }
`

export const InfoLine = styled(Card)`
  ${({theme}) => `
    --infoline-fg: ${theme.sanity.color.card.enabled.fg};
    --infoline-bg: ${theme.sanity.color.card.enabled.bg};
  `};
  user-drag: none;
  position: absolute;
  background-color: var(--infoline-bg);
  top: 0;
  left: 0;
  max-width: 65%;
  overflow-wrap: break-word;

  [data-ui='Text'] {
    color: var(--infoline-fg);
  }
`

export const DurationLine = styled(Card)`
  ${({theme}) => `
    --durationline-fg: ${theme.sanity.color.card.enabled.bg};
    --durationline-bg: ${theme.sanity.color.card.enabled.fg};
  `};
  user-drag: none;
  position: absolute;
  background-color: var(--durationline-bg);
  top: 0;
  right: 0;

  [data-ui='Text'] {
    color: var(--durationline-fg);
  }
`
