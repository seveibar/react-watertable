// @flow

import React from "react"
import BaseCell from "../BaseCell"

export const NumericCell = props => {
  return <BaseCell {...props}>{props.value}</BaseCell>
}

export default NumericCell
