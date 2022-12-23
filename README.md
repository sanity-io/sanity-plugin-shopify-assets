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

## Example Shopify API result

```json
{
    coming soon
}

```

## Example resulting asset document

```json
{
    coming soon
}
```

## License

[MIT](LICENSE) © Sanity.io <hello@sanity.io>

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
