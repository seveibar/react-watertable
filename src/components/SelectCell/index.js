// @flow

import React from "react"
import BaseCell from "../BaseCell"

export const SelectCell = props => {
  return <BaseCell {...props}>{props.value}</BaseCell>
}

export default SelectCell
