import {defineField, defineType} from 'sanity'

export const shopifyAssetPreviewSchema = defineType({
  type: 'object',
  name: 'shopify.assetPreview',
  title: 'Asset preview',
  fields: [
    defineField({
      type: 'number',
      name: 'height',
      title: 'Height',
    }),
    defineField({
      type: 'number',
      name: 'width',
      title: 'Width',
    }),
    defineField({
      type: 'url',
      name: 'url',
      title: 'URL',
    }),
  ],
})
