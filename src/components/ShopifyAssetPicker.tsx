import {Asset, PageInfo, ShopifyAPIResponse, ShopifyFile, shopifyAssetSchemaName} from '../types'
import {BehaviorSubject, Subscription} from 'rxjs'
import {Card, Dialog, Flex, Inline, Spinner, Stack, Text, TextInput} from '@sanity/ui'
import {PatchEvent, set, useProjectId, ObjectInputProps} from 'sanity'
import React, {useCallback, useEffect, useMemo, useState} from 'react'

import DialogHeader from './DialogHeader'
import {ErrorOutlineIcon} from '@sanity/icons'
import File from './File'
import InfiniteScroll from 'react-infinite-scroll-component'
import PhotoAlbum from 'react-photo-album'
import {Search} from './ShopifyAssetInput.styled'
import {search} from '../datastores/shopify'

const RESULTS_PER_PAGE = 42
const PHOTO_SPACING = 2
const PHOTO_PADDING = 1

export interface AssetPickerProps extends ObjectInputProps<Asset> {
  shopifyDomain: string
  isOpen: boolean
  onClose: () => void
}

export default function ShopifyAssetPicker(props: AssetPickerProps) {
  const {isOpen, onClose, shopifyDomain, onChange, schemaType, value} = props
  const projectId = useProjectId()

  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>()
  const [isLoading, setIsLoading] = useState(true)

  const searchSubject$ = useMemo(() => new BehaviorSubject(''), [])
  const cursorSubject$ = useMemo(() => new BehaviorSubject(''), [])

  useEffect(() => {
    if (!shopifyDomain) setError('Please configure your Shopify domain in the plugin config')
  }, [shopifyDomain])

  useEffect(() => {
    const searchSubscription: Subscription = search(
      projectId,
      shopifyDomain,
      searchSubject$,
      cursorSubject$,
      RESULTS_PER_PAGE
    ).subscribe({
      next: (results: ShopifyAPIResponse) => {
        setSearchResults((prevResults) => [...prevResults, ...results.assets])
        setPageInfo(results.pageInfo)
        setIsLoading(false)
      },
      error: (err) => {
        setError(
          `${
            err.response.data.message || err.message || 'An error occurred'
          } - check plugin configuration`
        )
      },
    })

    return () => searchSubscription.unsubscribe()
  }, [searchSubject$, cursorSubject$, shopifyDomain, projectId])

  const handleSearchTermChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.currentTarget.value
      setQuery(newQuery)
      setSearchResults([])
      setPageInfo(undefined)
      setIsLoading(true)

      cursorSubject$.next('')
      searchSubject$.next(newQuery)
    },
    [cursorSubject$, searchSubject$]
  )

  const handleScollerLoadMore = useCallback(() => {
    setIsLoading(true)
    if (pageInfo) cursorSubject$.next(pageInfo.cursor)
    searchSubject$.next(query)
  }, [cursorSubject$, pageInfo, searchSubject$, query])

  const handleSelect = useCallback(
    (file: Asset) => {
      file._key = value?._key
      file._type = schemaType.name
      onChange(PatchEvent.from([set(file)]))
      onClose()
    },
    [onChange, onClose, schemaType.name, value?._key]
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

  const handleWidth = useCallback((width: number) => {
    if (width < 300) return 150
    else if (width < 600) return 200
    return 300
  }, [])

  return (
    <Dialog
      id="shopify-asset-source"
      header={<DialogHeader title="Shopify Assets" shopifyDomain={shopifyDomain} />}
      onClose={onClose}
      open={isOpen}
      width={4}
    >
      <Stack space={3} padding={4}>
        {error ? (
          <Card overflow="hidden" padding={4} radius={2} shadow={1} tone="critical">
            <Flex align="center" gap={3}>
              <Text size={2}>
                <ErrorOutlineIcon />
              </Text>
              <Inline space={2}>
                <Text size={1}>{error}</Text>
              </Inline>
            </Flex>
          </Card>
        ) : (
          <>
            <Card>
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
            </Card>
            {!isLoading && searchResults.length === 0 && (
              <Text size={1} muted>
                No results found
              </Text>
            )}
            <InfiniteScroll
              dataLength={searchResults.length} // This is important field to render the next data
              next={handleScollerLoadMore}
              hasMore={pageInfo ? pageInfo?.hasNextPage : true}
              scrollThreshold={0.99}
              height="60vh"
              loader={
                <Flex align="center" justify="center" padding={3}>
                  <Spinner muted />
                </Flex>
              }
              endMessage={
                <Flex align="center" justify="center" padding={3}>
                  <Text size={1} muted>
                    No more results
                  </Text>
                </Flex>
              }
            >
              {searchResults && (
                <PhotoAlbum
                  layout="rows"
                  spacing={PHOTO_SPACING}
                  padding={PHOTO_PADDING}
                  targetRowHeight={handleWidth}
                  photos={searchResults.map((file: ShopifyFile) => ({
                    src:
                      file.url ||
                      'https://cdn.shopify.com/s/files/1/0555/4906/7569/files/preview_images/document-7f23220eb4be7eeaa6e225738b97d943f22e74367cd2d7544fc3b37fb36acd71_0d65c290-de39-4adc-9f23-4aa7354dd56d.png?v=1671123685',
                    width: file?.preview?.width || 2048,
                    height: file?.preview?.height || 2048,
                    key: file.id,
                    data: file,
                  }))}
                  renderPhoto={renderFile}
                  componentsProps={{
                    containerProps: {style: {marginBottom: `${PHOTO_SPACING}px`}},
                  }}
                />
              )}
            </InfiniteScroll>
          </>
        )}
      </Stack>
    </Dialog>
  )
}
