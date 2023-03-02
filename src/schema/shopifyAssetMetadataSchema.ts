import {defineField, defineType} from 'sanity'

export const shopifyAssetMetadataSchema = defineType({
  type: 'object',
  name: 'shopify.assetMetadata',
  title: 'Asset metadata',
  fields: [
    defineField({
      type: 'string',
      name: 'alt',
      title: 'Alternative text',
    }),
    defineField({
      type: 'number',
      name: 'duration',
      title: 'Duration',
    }),
    defineField({
      type: 'number',
      name: 'fileSize',
      title: 'File size',
    }),
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
  ],
})
