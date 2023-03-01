import {definePlugin, type ObjectDefinition} from 'sanity'
import {shopifyAssetSchema} from './schema/shopifyAssetSchema'
import {shopifyAssetPreviewSchema} from './schema/shopifyAssetPreviewSchema'
import {shopifyAssetMetadataSchema} from './schema/shopifyAssetMetadataSchema'
import type {PluginConfig} from './types'

export * from './types'

// enables autocompletion and validation of document options
declare module 'sanity' {
  export namespace Schema {
    // here we type up our custom schema definition
    export type ShopifyAssetTypeDef = Omit<ObjectDefinition, 'type' | 'fields'> & {
      type: 'shopify.asset'
      options: {
        shopifyDomain: string
      }
    }
    // Adds 'extension-type' as an intrinsic type
    export interface IntrinsicTypeDefinition {
      'shopify.asset': ShopifyAssetTypeDef
    }
  }
}

export const shopifyAssets = definePlugin<PluginConfig>((config) => {
  return {
    name: 'shopify-asset-schema',
    schema: {
      types: [shopifyAssetPreviewSchema, shopifyAssetMetadataSchema, shopifyAssetSchema(config)],
    },
  }
})
