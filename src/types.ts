import {ObjectSchemaType} from 'sanity'

export interface PluginConfig {
  /**
   * Your *.myshopify.com domain. Do not include https:// or any path.
   */
  shopifyDomain: string
}

export interface ObjectSchemaWithOptions extends ObjectSchemaType {
  options: {
    shopifyDomain: string
  }
}

type PossibleFileTypes = 'file' | 'image' | 'video'

export interface AssetPreviewImage {
  height: number
  url: string
  width: number
}

export interface AssetMeta {
  alt?: string
  duration?: number
  fileSize?: number
  height?: number
  width?: number
}

export interface ShopifyFile {
  meta: AssetMeta
  preview: AssetPreviewImage
  id: string
  type: PossibleFileTypes
  url: string
}

export interface Asset extends ShopifyFile {
  filename?: string
}

export interface PageInfo {
  hasNextPage: boolean
  cursor: string
}

export interface ShopifyAPIResponse {
  pageInfo: PageInfo
  assets: ShopifyFile[]
}
