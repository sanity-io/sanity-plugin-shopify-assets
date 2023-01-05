# sanity-plugin-asset-source-shopify

> This is a **Sanity Studio v3** plugin.

## Installation

```
npm install --save sanity-plugin-shopify-assets
```

## Usage

Add it as a plugin in sanity.config.ts (or .js):

```
 import {defineConfig} from 'sanity'
 import {shopifyAssets} from 'sanity-plugin-shopify-assets'

 export const defineConfig({
     //...
     plugins: [
         shopifyAssets({
            shopifyDomain: '*.myshopify.com'
         })
     ]
 })
```

Simply update the `shopifyDomain` to your store URL. You'll need to install the [Sanity Connect](https://www.sanity.io/docs/sanity-connect-for-shopify) app on your store to handle authorisation.

It's also possible to define the Shopify domain on the field level, which allows you to retrieve assets from different stores.

## Example of resulting object

```json
{
  "id": "gid://shopify/MediaImage/21154034647345",
  "url": "https://cdn.shopify.com/s/files/1/0555/4906/7569/files/Green_1.jpg?v=1665668073",
  "type": "image",
  "meta": {
    "fileSize": 362812,
    "alt": "",
    "width": 3169,
    "height": 3169
  },
  "preview": {
    "url": "https://cdn.shopify.com/s/files/1/0555/4906/7569/files/Green_1.jpg?v=1665668073",
    "width": 3169,
    "height": 3169
  },
  "filename": "Green_1.jpg"
}
```

## License

[MIT](LICENSE) © Sanity.io <hello@sanity.io>

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
