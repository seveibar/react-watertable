// @flow

import React from "react"
import BaseCell from "../BaseCell"
import InputBase from "@material-ui/core/InputBase"

export const TextCell = props => {
  return (
    <BaseCell
      {...props}
      readContent={props.value}
      editContent={
        <div>
          <InputBase
            onChange={e => props.onChange(e.target.value)}
            autoFocus
            defaultValue={props.value}
          />
        </div>
      }
    />
  )
}

export default TextCell
