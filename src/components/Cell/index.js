// @flow

import React from "react"
import type { ColumnSchema } from "../../types"
import TextCell from "../TextCell"
import SelectCell from "../SelectCell"
import FileCell from "../FileCell"
import ImageCell from "../ImageCell"
import NumericCell from "../NumericCell"
import BooleanCell from "../BooleanCell"
import JSONCell from "../JSONCell"
import JSONArrayCell from "../JSONArrayCell"
import MarkdownCell from "../MarkdownCell"

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
    case "json": {
      return <JSONCell {...props} />
    }
    case "json-array": {
      return <JSONArrayCell {...props} />
    }
    case "markdown": {
      return <MarkdownCell {...props} />
    }
  }
  throw new Error(
    `Unknown Cell Configuration: "${JSON.stringify(props, null, "  ")}"`
  )
}

export default Cell
