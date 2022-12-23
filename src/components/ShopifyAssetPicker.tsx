import React, {useCallback, useEffect, useState} from 'react'
import {Dialog, Stack, Text} from '@sanity/ui'
import PhotoAlbum from 'react-photo-album'
import {PatchEvent, set} from 'sanity'
import {ShopifyAsset} from '../types'
import {exampleFiles} from '../utils/shopify'
import DialogHeader from './DialogHeader'
import File from './File'

const RESULTS_PER_PAGE = 42
const PHOTO_SPACING = 2
const PHOTO_PADDING = 1

interface AssetPickerProps {
  isOpen: boolean
  onClose: () => void
  shopifyDomain: string
  onChange: (event: PatchEvent) => void
}

export default function ShopifyAssetPicker(props: AssetPickerProps) {
  const {isOpen, onClose, shopifyDomain, onChange} = props
  const [error, setError] = useState('')
  // const [query, setQuery] = useState('')
  const [files, setFiles] = useState(exampleFiles.data.files.edges)
  // const [pageInfo, setPageInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!shopifyDomain) setError('Please configure your Shopify in the plugin config')
  }, [shopifyDomain])

  const handleWidth = useCallback((width: number) => {
    if (width < 300) return 150
    else if (width < 600) return 200
    return 300
  }, [])

  const handleSelect = useCallback(
    (file: ShopifyAsset) => {
      onChange(PatchEvent.from([set(file)]))
      onClose()
    },
    [onChange, onClose]
  )

  const renderFile = useCallback(
    (fileProps: any) => {
      const {photo, layout} = fileProps
      return (
        <File
          onClick={handleSelect}
          data={photo.data}
          width={layout.width}
          height={layout.height}
        />
      )
    },
    [handleSelect]
  )

  // const handleSearchTermChanged = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const newQuery = event.currentTarget.value
  //     setQuery(newQuery)
  //   },
  //   [setQuery]
  // )

  return (
    <Dialog
      id="shopify-asset-source"
      header={<DialogHeader title="Shopify Assets" shopifyDomain={shopifyDomain} />}
      onClose={onClose}
      open={isOpen}
      width={4}
    >
      <Stack space={3} padding={4}>
        {/* <Card>
          <Search space={3}>
            <Text size={1} weight="semibold">
              Search Shopify for assets
            </Text>
            <TextInput
              label="Search Images"
              placeholder="filename.jpg"
              value={query}
              onChange={handleSearchTermChanged}
            />
          </Search>
        </Card> */}
        {error && (
          <Text size={1} muted>
            {error}
          </Text>
        )}
        {!isLoading && files.length === 0 && (
          <Text size={1} muted>
            No results found
          </Text>
        )}
        {files && (
          <PhotoAlbum
            key={`shopify-assets`}
            layout="rows"
            spacing={PHOTO_SPACING}
            padding={PHOTO_PADDING}
            targetRowHeight={handleWidth}
            photos={files.map((file) => ({
              src: file.node.preview.image.url,
              width: file.node.preview.image.width,
              height: file.node.preview.image.height,
              key: file.node.id,
              data: file.node,
            }))}
            renderPhoto={renderFile}
            componentsProps={{
              containerProps: {style: {marginBottom: `${PHOTO_SPACING}px`}},
            }}
          />
        )}
        {/* <InfiniteScroll
          dataLength={this.getPhotos().length} // This is important field to render the next data
          next={this.handleScollerLoadMore}
          // scrollableTarget="unsplash-scroller"
          hasMore
          scrollThreshold={0.99}
          height="60vh"
          loader={
            <Flex align="center" justify="center" padding={3}>
              <Spinner muted />
            </Flex>
          }
          endMessage={
            <Text size={1} muted>
              No more results
            </Text>
          }
        >
          {searchResults
            .filter((photos) => photos.length > 0)
            .map((photos: UnsplashPhoto[], index) => (
              <PhotoAlbum
                key={`gallery-${query || 'popular'}-${index}`}
                layout="rows"
                spacing={PHOTO_SPACING}
                padding={PHOTO_PADDING}
                targetRowHeight={(width) => {
                  if (width < 300) return 150
                  else if (width < 600) return 200
                  return 300
                }}
                photos={photos.map((photo: UnsplashPhoto) => ({
                  src: photo.urls.small,
                  width: photo.width,
                  height: photo.height,
                  key: photo.id,
                  data: photo,
                }))}
                renderPhoto={this.renderImage}
                componentsProps={{
                  containerProps: {style: {marginBottom: `${PHOTO_SPACING}px`}},
                }}
              />
            ))}
        </InfiniteScroll> */}
      </Stack>
    </Dialog>
  )
}
