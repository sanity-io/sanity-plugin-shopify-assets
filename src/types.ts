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

type PossibleFileTypeNames = 'GenericFile' | 'MediaImage' | 'Video'

interface ShopifyImage {
  altText?: string
  height?: number
  id?: string
  url: string
  width?: number
}

export interface ShopifyAsset {
  alt?: string
  bytes?: number
  createdAt: Date
  duration?: number
  filename?: string
  height?: number
  preview?: ShopifyImage
  shopifyId: string
  type: PossibleFileTypeNames
  url?: string
  width?: number
}

/* Below we define the types for the Shopify API */

export interface ShopifyFile {
  alt?: string
  createdAt: Date
  duration?: number
  id: string
  image?: ShopifyImage
  originalFileSize?: number
  originalSource?: {
    fileSize?: number
    height?: number
    url?: string
    width?: number
  }
  preview: {
    image?: ShopifyImage
  }
  typename: PossibleFileTypeNames
  url?: string
}

export interface FileEdge {
  cursor: string
  node: ShopifyFile
}

export interface PageInfo {
  endCursor?: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
}

export interface FileConnection {
  edges: Array<FileEdge>
  nodes: Array<ShopifyFile>
  pageInfo: PageInfo
}
