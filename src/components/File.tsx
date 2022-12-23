import {Text, useTheme} from '@sanity/ui'
import React, {useCallback, useRef} from 'react'
import {normalizeFileData} from '../utils/helpers'
import {InfoLine, DurationLine, Root} from './File.styled'
import prettyBytes from 'pretty-bytes'
import prettyMilliseconds from 'pretty-ms'
import {ShopifyFile, ShopifyAsset} from '../types'

type Props = {
  data: ShopifyFile
  width: number
  height: number
  onClick: (file: ShopifyAsset) => void
}

export default function File(props: Props) {
  const {onClick, data, width, height} = props
  const rootElm = useRef<HTMLDivElement>(null)

  const normalizedData = normalizeFileData(data)
  const {bytes, duration, filename, preview} = normalizedData

  const handleClick = useCallback(() => {
    onClick(normalizedData)
  }, [onClick, normalizedData])

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
      <InfoLine padding={2} radius={2} margin={2}>
        <Text size={1} title={`Select ${filename}`}>
          {filename} {bytes && `(${prettyBytes(bytes)})`}
        </Text>
      </InfoLine>
      {duration && (
        <DurationLine padding={2} radius={2} margin={2}>
          <Text size={1} title={`Video duration: ${filename}`}>
            {prettyMilliseconds(duration, {colonNotation: true, secondsDecimalDigits: 0})}
          </Text>
        </DurationLine>
      )}
    </Root>
  )
}
