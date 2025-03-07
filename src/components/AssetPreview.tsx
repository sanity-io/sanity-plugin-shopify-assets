import React from 'react'
import prettyBytes from 'pretty-bytes'
import prettyMilliseconds from 'pretty-ms'
import {styled} from 'styled-components'
import {Box, Flex, Text} from '@sanity/ui'

import {Asset} from '../types'
import {DurationLine, InfoLine} from './File.styled'
import VideoPlayer from './VideoPlayer'

interface ComponentProps {
  value: Asset
}

export const StyledBox = styled(Box)`
  background-color: ${({theme}) => theme.sanity.color?.card?.enabled?.bg2};
  border: ${({theme}) => `1px solid ${theme.sanity?.color?.card?.enabled?.border}`};
  display: flex;
  justify-content: center;
  margin-bottom: ${({theme}) => theme.sanity.space[4]};
  position: relative;
`

const RenderAsset = ({value, url}: {value: Asset; url: string}) => {
  switch (value.type) {
    case 'video':
      return <VideoPlayer src={url} kind="player" />
    default:
      return (
        <Flex justify="center">
          <img
            alt="preview"
            src={value?.preview?.url}
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: '30vh',
            }}
          />
        </Flex>
      )
  }
}

const AssetPreview = ({value}: ComponentProps) => {
  const url = value && value.url

  if (!value || !url) {
    return null
  }

  const {filename, meta} = value
  const {fileSize, duration} = meta

  return (
    <StyledBox marginBottom={2}>
      <RenderAsset value={value} url={url} />
      <InfoLine padding={2} radius={2} margin={2}>
        <Text size={1} title={`Select ${filename}`}>
          {filename} {fileSize && `(${prettyBytes(fileSize)})`}
        </Text>
      </InfoLine>
      {duration && (
        <DurationLine padding={2} radius={2} margin={2}>
          <Text size={1} title={`Video duration: ${filename}`}>
            {prettyMilliseconds(duration, {colonNotation: true, secondsDecimalDigits: 0})}
          </Text>
        </DurationLine>
      )}
    </StyledBox>
  )
}

export default AssetPreview
