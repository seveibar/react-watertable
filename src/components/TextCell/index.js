// @flow

import React from "react"
import BaseCell from "../BaseCell"
import InputBase from "@material-ui/core/InputBase"

export const TextCell = props => {
  return (
    <BaseCell
      {...props}
      onClear={e => e.key === "Delete" && props.onChange("")}
      readContent={props.value}
      editContent={
        <div>
          <InputBase
            onChange={e => props.onChange(e.target.value)}
            autoFocus
            value={props.value}
          />
        </div>
      }
    />
  )
}

export default TextCell
