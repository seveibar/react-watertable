// @flow

import React from "react"
import BaseCell from "../BaseCell"
import InputBase from "@material-ui/core/InputBase"
import Checkbox from "@material-ui/core/Checkbox"

export const BooleanCell = props => {
  return (
    <BaseCell {...props} onClear={() => props.onChange(false)} centered>
      <Checkbox
        disabled={props.editable === false}
        onChange={(e, checked) => props.onChange(checked)}
        checked={Boolean(props.value)}
      />
    </BaseCell>
  )
}

export default BooleanCell
