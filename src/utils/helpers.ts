import {ShopifyFile, ShopifyAsset} from '../types'

export const extractName = (name: string): string => name?.split('/')?.pop()?.split('?')[0] ?? ''

export const normalizeFileData = (file: ShopifyFile): ShopifyAsset => {
  let url
  let filename
  let bytes
  let duration
  let height
  let width

  const {alt, createdAt, id, preview, typename} = file
  switch (typename) {
    case 'GenericFile': {
      url = file?.url
      filename = url ? extractName(url) : ''
      bytes = file?.originalFileSize
      break
    }
    case 'MediaImage':
      url = file?.image?.url
      filename = url ? extractName(url) : ''
      bytes = file?.originalSource?.fileSize
      height = file?.image?.height
      width = file?.image?.width
      break
    case 'Video':
      url = file?.originalSource?.url
      filename = url ? extractName(url) : ''
      bytes = file?.originalSource?.fileSize
      duration = file?.duration
      height = file?.originalSource?.height
      width = file?.originalSource?.width
      break
    default:
      url = undefined
      filename = undefined
      break
  }
  return {
    alt,
    createdAt,
    duration,
    height,
    filename,
    bytes,
    preview: preview?.image,
    shopifyId: id,
    type: typename,
    url,
    width,
  }
}
