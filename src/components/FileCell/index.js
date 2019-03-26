// @flow

import React from "react"
import BaseCell from "../BaseCell"

export const FileCell = props => {
  return <BaseCell {...props}>{props.value}</BaseCell>
}

export default FileCell
