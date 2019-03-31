// @flow

import React from "react"
import TextFields from "@material-ui/icons/TextFields"
import List from "@material-ui/icons/List"
import FormatListNumbered from "@material-ui/icons/FormatListNumbered"
import InsertDriveFile from "@material-ui/icons/InsertDriveFile"
import Collections from "@material-ui/icons/Collections"
import Image from "@material-ui/icons/Image"
import CheckBox from "@material-ui/icons/CheckBox"
import LocalOffer from "@material-ui/icons/LocalOffer"
import AccessTime from "@material-ui/icons/AccessTime"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  icony: {
    fontSize: 14,
    fontWeight: "bold"
  }
})

export const TypeIcon = props => {
  const c = useStyles()
  const { type, multiple } = props
  switch (type) {
    case "text": {
      return <TextFields {...props} />
    }
    case "select": {
      if (multiple) return <List {...props} />
      return <LocalOffer {...props} />
    }
    case "file": {
      return <InsertDriveFile {...props} />
    }
    case "image": {
      if (multiple) return <Collections {...props} />

      return <Image {...props} />
    }
    case "boolean": {
      return <CheckBox {...props} />
    }
    case "numeric": {
      return (
        <div {...props} className={c.icony}>
          #
        </div>
      )
    }
    case "markdown": {
      return (
        <div {...props} className={c.icony}>
          M
        </div>
      )
    }
    case "json": {
      return (
        <div {...props} className={c.icony}>
          JS
        </div>
      )
    }
    case "json-array": {
      return (
        <div {...props} className={c.icony}>
          [...]
        </div>
      )
    }
  }
  return null
}

export default TypeIcon
