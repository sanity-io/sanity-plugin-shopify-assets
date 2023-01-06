/* eslint-disable */
import ShopifyAssetInput from '../components/ShopifyAssetInput'
import AssetDiff from '../components/AssetDiff'
import AssetPreview from '../components/AssetPreview'
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
        name: 'filename',
      }),
      defineField({
        type: 'string',
        name: 'id',
      }),
      defineField({
        type: 'object',
        name: 'meta',
        fields: [
          defineField({
            type: 'string',
            name: 'alt',
          }),
          defineField({
            type: 'number',
            name: 'duration',
          }),
          defineField({
            type: 'number',
            name: 'fileSize',
          }),
          defineField({
            type: 'number',
            name: 'height',
          }),
          defineField({
            type: 'number',
            name: 'width',
          }),
        ],
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
        name: 'type',
      }),
      defineField({
        type: 'url',
        name: 'url',
      }),
    ],
    ...({
      components: {
        input: ShopifyAssetInput,
        diff: AssetDiff,
        preview: AssetPreview,
      },
    } as {}),
    preview: {
      select: {
        meta: 'meta',
        preview: 'preview',
        url: 'url',
        filename: 'filename',
        type: 'type',
      },
      prepare({url, meta, preview, filename, type}) {
        return {
          title: filename,
          subtitle: type,
          value: {
            url,
            meta,
            preview,
            filename,
          },
        }
      },
    },
  })
}
