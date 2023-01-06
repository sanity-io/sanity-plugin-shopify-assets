import React from 'react'
import {DiffFromTo} from 'sanity'
import {Asset} from '../types'
import {Flex, Text, Stack} from '@sanity/ui'

type Props = {
  value: Asset | undefined
}

const CloudinaryDiffPreview = ({value}: Props) => {
  if (!value) {
    return null
  }

  if (value?.preview?.url) {
    return (
      <Flex justify="center" align="center" height="fill" width="fill">
        <Stack space={2}>
          <img
            alt="preview"
            src={value?.preview?.url}
            style={{
              objectFit: 'contain',
              margin: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
          <Text size={1}>{value.type.charAt(0).toUpperCase() + value.type.slice(1)}</Text>
        </Stack>
      </Flex>
    )
  }

  return (
    <Flex justify="center" align="center" height="fill" width="fill">
      <div>(no image)</div>
    </Flex>
  )
}

type DiffProps = {
  diff: any
  schemaType: any
}

const AssetDiff = ({diff, schemaType}: DiffProps) => {
  return (
    <DiffFromTo
      diff={diff}
      schemaType={schemaType}
      previewComponent={CloudinaryDiffPreview}
      layout={'grid'}
    />
  )
}

export default AssetDiff
