import {Button, Card, Flex, Grid, Inline, Stack, Text} from '@sanity/ui'
import {ObjectInputProps, PatchEvent, unset} from 'sanity'
import {useCallback, useState} from 'react'

import {Asset} from '../types'
import AssetPreview from './AssetPreview'
import {ErrorOutlineIcon} from '@sanity/icons'
import React from 'react'
import ShopifyAssetPicker from './ShopifyAssetPicker'
import ShopifyIcon from './ShopifyIcon'

export default function ShopifyAssetInput(props: ObjectInputProps) {
  const {onChange, readOnly, value, schemaType} = props
  const {options} = schemaType
  const {shopifyDomain} = options

  const [dialogOpen, setDialogOpen] = useState(false)

  const removeValue = useCallback(() => {
    onChange(PatchEvent.from([unset()]))
  }, [onChange])

  const onOpen = useCallback(() => {
    setDialogOpen(true)
  }, [setDialogOpen])

  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [setDialogOpen])

  if (!shopifyDomain) {
    return (
      <Card overflow="hidden" padding={4} radius={2} shadow={1} tone="critical">
        <Flex align="center" gap={3}>
          <Text size={2}>
            <ErrorOutlineIcon />
          </Text>
          <Inline space={2}>
            <Text size={1}>
              You need to configure your *.myshopify.com domain in the plugin / field options to
              enable Shopify Assets.
            </Text>
          </Inline>
        </Flex>
      </Card>
    )
  }

  return (
    <>
      {dialogOpen && (
        <ShopifyAssetPicker
          {...props}
          shopifyDomain={shopifyDomain}
          isOpen={dialogOpen}
          onClose={onClose}
          value={value as Asset}
        />
      )}
      <Stack>
        <AssetPreview value={value as Asset} />

        <Grid gap={1} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'}}>
          <Button
            disabled={readOnly}
            mode="ghost"
            icon={ShopifyIcon}
            title="Select an asset"
            onClick={onOpen}
            text="Select…"
          />
          <Button
            disabled={readOnly || !value}
            tone="critical"
            mode="ghost"
            title="Remove asset"
            text="Remove"
            onClick={removeValue}
          />
        </Grid>
      </Stack>
    </>
  )
}
