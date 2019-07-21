// @flow

import React from "react"
import BaseCell from "../BaseCell"
import InputBase from "@material-ui/core/InputBase"
import JSONArrayCell from "../JSONArrayCell"
import { useUnselectCell } from "../../hooks/use-selected-cell.js"

export const TextCell = props => {
  if (props.multiple) {
    return (
      <JSONArrayCell
        {...props}
        onChange={ar => props.onChange(ar.map(a => a.text))}
        value={(props.value || []).map(s => ({ text: s }))}
      />
    )
  }

  const unselectCell = useUnselectCell()

  return (
    <BaseCell
      {...props}
      onClear={e => e.key === "Delete" && props.onChange("")}
      readContent={
        props.value || <div style={{ opacity: 0.5 }}>{props.placeholder}</div>
      }
      editContent={
        <div>
          <InputBase
            onKeyDown={e => {
              if (e.key === "Escape") {
                unselectCell()
              }
            }}
            placeholder={props.placeholder}
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
