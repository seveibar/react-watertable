// @flow

import React from "react"
import BaseCell from "../BaseCell"

export const ImageCell = props => {
  return <BaseCell {...props}>{props.value}</BaseCell>
}

export default ImageCell
