/* eslint-disable */
import ShopifyAssetInput from '../components/ShopifyAssetInput'
// import AssetDiff from '../components/AssetDiff'
// import AssetPreview from '../components/AssetPreview'
import {defineField, defineType} from 'sanity'

interface ObjectConfig {
  shopifyDomain: string
}

declare module 'sanity' {
  interface ObjectOptions {
    shopifyDomain?: string
  }
}

export const shopifyAssetSchema = (config: ObjectConfig) => {
  const {shopifyDomain} = config

  return defineType({
    type: 'object',
    name: 'shopify.asset',
    title: 'Shopify Asset',
    options: {
      shopifyDomain,
    },
    fields: [
      defineField({
        type: 'string',
        name: 'alt',
      }),
      defineField({
        type: 'number',
        name: 'bytes',
      }),
      defineField({
        type: 'datetime',
        name: 'createdAt',
      }),
      defineField({
        type: 'number',
        name: 'duration',
      }),
      defineField({
        type: 'string',
        name: 'filename',
      }),
      defineField({
        type: 'number',
        name: 'height',
      }),
      defineField({
        type: 'object',
        name: 'preview',
        fields: [
          defineField({
            type: 'number',
            name: 'height',
          }),
          defineField({
            type: 'number',
            name: 'width',
          }),
          defineField({
            type: 'url',
            name: 'url',
          }),
        ],
      }),
      defineField({
        type: 'string',
        name: 'shopifyId',
      }),
      defineField({
        type: 'string',
        name: 'type',
        // "MediaImage", "GenericFile", "Video"
      }),
      defineField({
        type: 'url',
        name: 'url',
      }),
      defineField({
        type: 'number',
        name: 'width',
      }),
    ],
    components: {
      input: ShopifyAssetInput,
      // diff: AssetDiff,
      // preview: AssetPreview,
    },
    preview: {
      select: {
        url: 'url',
        type: 'type',
      },
      prepare({url, type}) {
        return {
          title: url,
          type,
        }
      },
    },
  })
}
