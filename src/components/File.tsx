import {Asset, ShopifyFile} from '../types'
import {DurationLine, InfoLine, Root} from './File.styled'
import React, {useCallback, useRef} from 'react'
import {Text, useTheme} from '@sanity/ui'

import {extractName} from '../utils/helpers'
import prettyBytes from 'pretty-bytes'
import prettyMilliseconds from 'pretty-ms'

type Props = {
  data: ShopifyFile
  width: number
  height: number
  onClick: (file: Asset) => void
}

export default function File(props: Props) {
  const {onClick, data, width, height} = props
  const rootElm = useRef<HTMLDivElement>(null)

  const {preview, meta} = data
  const filename = extractName(data.url)

  const handleClick = useCallback(() => {
    onClick({...data, filename})
  }, [onClick, data, filename])

  const theme = useTheme().sanity
  return (
    <Root
      ref={rootElm}
      studioTheme={theme}
      title={`${filename}`}
      tabIndex={0}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url("${preview?.url}")`,
      }}
      onClick={handleClick}
    >
      <InfoLine padding={2} radius={2} margin={2} studioTheme={theme}>
        <Text size={1} title={`Select ${filename}`}>
          {filename} {meta.fileSize && `(${prettyBytes(meta.fileSize)})`}
        </Text>
      </InfoLine>
      {meta.duration && (
        <DurationLine padding={2} radius={2} margin={2} studioTheme={theme}>
          <Text size={1} title={`Video duration: ${filename}`}>
            {prettyMilliseconds(meta.duration, {colonNotation: true, secondsDecimalDigits: 0})}
          </Text>
        </DurationLine>
      )}
    </Root>
  )
}
