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
import DynamicCell from "../DynamicCell"
import CellErrorBoundary from "../CellErrorBoundary"

export const OmniCell = (props: ColumnSchema) => {
  switch (props.type) {
    case "text": {
      return <TextCell {...props} />
    }
    case "text-array": {
      return <TextCell {...props} type="text" multiple={true} />
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
    case "dynamic": {
      return <DynamicCell {...props} />
    }
  }
  throw new Error(
    `Unknown Cell Configuration: "${JSON.stringify(props, null, "  ")}"`
  )
}

export const Cell = (props: ColumnSchema) => {
  return (
    <CellErrorBoundary cellProps={props}>
      <OmniCell {...props} />
    </CellErrorBoundary>
  )
}

export default Cell
