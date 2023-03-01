import React, {useCallback} from 'react'
import {Box, Flex, Button} from '@sanity/ui'
import {LaunchIcon} from '@sanity/icons'

interface Props {
  title: string
  shopifyDomain: string
}

const DialogHeader = (props: Props) => {
  const {title, shopifyDomain} = props

  const handleOpenInNewTab = useCallback(() => {
    window.open(`https://${shopifyDomain}/admin/settings/files`, '_blank')
  }, [shopifyDomain])

  return (
    <Flex align="center">
      {title}
      {/*
        HACK: Sanity UI will attempt to focus the first 'focusable' descendant of any dialog.
        Typically this is fine, but since our first focusable element is a button with a tooltip, this
        default behaviour causes the tooltip to appear whenever the dialog is opened, which we don't want!

        To get around this, we include a pseudo-hidden input to ensure our tooltip-enabled button remains
        unfocused on initial mount.
        */}
      <input style={{opacity: 0}} tabIndex={-1} type="button" />
      <Box style={{position: 'absolute', right: '-1.5em'}}>
        <Box className="button-large">
          <Button
            fontSize={1}
            icon={LaunchIcon}
            mode="bleed"
            onClick={handleOpenInNewTab}
            text="Add New"
          />
        </Box>
      </Box>
    </Flex>
  )
}

export default DialogHeader
