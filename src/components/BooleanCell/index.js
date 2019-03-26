// @flow

import React from "react"
import BaseCell from "../BaseCell"

export const BooleanCell = props => {
  return <BaseCell {...props}>{props.value}</BaseCell>
}

export default BooleanCell
