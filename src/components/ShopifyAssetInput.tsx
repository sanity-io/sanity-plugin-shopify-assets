import React from 'react'
import {WarningOutlineIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Grid, Stack, Text} from '@sanity/ui'
import {useCallback, useState} from 'react'
import {ObjectInputProps, PatchEvent, unset} from 'sanity'
import {ShopifyAsset} from '../types'
import AssetPreview from './AssetPreview'
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
      <Card padding={4} radius={2} shadow={1} tone="caution">
        <Flex>
          <Box marginRight={3}>
            <Text muted size={1}>
              <WarningOutlineIcon />
            </Text>
          </Box>

          <Box flex={1}>
            <Text size={1}>
              You need to configure your *.myshopify.com domain in the plugin / field options to
              enable Shopify Assets.
            </Text>
          </Box>
        </Flex>
      </Card>
    )
  }

  return (
    <>
      {dialogOpen && (
        <ShopifyAssetPicker
          isOpen={dialogOpen}
          onClose={onClose}
          onChange={onChange}
          shopifyDomain={shopifyDomain}
        />
      )}
      <Stack>
        <AssetPreview value={value as ShopifyAsset} />

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
