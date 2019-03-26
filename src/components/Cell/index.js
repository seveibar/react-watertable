// @flow

import React from "react"
import type { ColumnSchema } from "../../types"
import TextCell from "../TextCell"
import SelectCell from "../SelectCell"
import FileCell from "../FileCell"
import ImageCell from "../ImageCell"
import NumericCell from "../NumericCell"
import BooleanCell from "../BooleanCell"

export const Cell = (props: ColumnSchema) => {
  switch (props.type) {
    case "text": {
      return <TextCell {...props} />
    }
    case "select": {
      return <SelectCell {...props} />
    }
    case "file": {
      return <FileCell {...props} />
    }
    case "image": {
      return <ImageCell {...props} />
    }
    case "boolean": {
      return <BooleanCell {...props} />
    }
    case "numeric": {
      return <NumericCell {...props} />
    }
  }
  throw new Error(
    `Unknown Cell Configuration: "${JSON.stringify(props, null, "  ")}"`
  )
}

export default Cell
