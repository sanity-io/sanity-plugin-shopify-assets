import {Box, Flex, Text, Theme, useTheme} from '@sanity/ui'
import {DurationLine, InfoLine} from './File.styled'

import {Asset} from '../types'
import React from 'react'
import VideoPlayer from './VideoPlayer'
import prettyBytes from 'pretty-bytes'
import prettyMilliseconds from 'pretty-ms'
import styled from 'styled-components'
import {PreviewProps} from 'sanity'

type SanityTheme = Theme['sanity']

interface Style {
  studioTheme: SanityTheme
}

interface ComponentProps extends PreviewProps {
  value: Asset
}

export const StyledBox = styled(Box)`
  background-color: ${({studioTheme}: Style) => studioTheme.color.card.enabled.bg2};
  border: ${({studioTheme}: Style) => `1px solid ${studioTheme.color.card.enabled.border}`};
  display: flex;
  justify-content: center;
  margin-bottom: ${({studioTheme}: Style) => studioTheme.space[4]};
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
  const theme = useTheme().sanity

  if (!value || !url) {
    return null
  }

  const {filename, meta} = value
  const {fileSize, duration} = meta

  return (
    <StyledBox studioTheme={theme} marginBottom={2}>
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
