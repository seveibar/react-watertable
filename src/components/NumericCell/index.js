// @flow

import React, { useState } from "react"
import BaseCell from "../BaseCell"
import InputBase from "@material-ui/core/InputBase"

export const NumericCell = props => {
  const [hasError, changeHasError] = useState(false)
  const [unsafeVal, changeUnsafeVal] = useState((props.value || "").toString())
  return (
    <BaseCell
      {...props}
      onClear={e => e.key === "Delete" && props.onChange(undefined)}
      readContent={props.value}
      editContent={
        <div>
          <InputBase
            placeholder={props.placeholder}
            error={hasError}
            onChange={e => {
              changeUnsafeVal(e.target.value)
              if (!isNaN(e.target.value)) {
                props.onChange(parseFloat(e.target.value))
              }
            }}
            autoFocus
            value={unsafeVal}
          />
        </div>
      }
    />
  )
}

export default NumericCell
