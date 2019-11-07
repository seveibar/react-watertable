// @flow

import React from "react"
import BaseCell from "../BaseCell"
import InputBase from "@material-ui/core/InputBase"
import JSONArrayCell from "../JSONArrayCell"
import { useUnselectCell } from "../../hooks/use-selected-cell.js"
import SimpleDialog from "../SimpleDialog"
import { styled } from "@material-ui/core/styles"

const UnselectedValue = styled("div")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
})

const Placeholder = styled("div")({
  opacity: 0.5,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden"
})

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

  const largeInput =
    (props.value || "").toString().length > 50 ||
    (props.value || "").toString().includes("\n")

  const editContentInput = (
    <InputBase
      onKeyDown={e => {
        if (e.key === "Escape") {
          unselectCell()
        } else if (e.key === "Enter" && !largeInput) {
          props.onChange(props.value + "\n")
        }
      }}
      fullWidth={largeInput}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
      autoFocus
      onFocus={e => {
        e.target.value = ""
        setTimeout(() => {
          e.target.value = props.value
        }, 1)
      }}
      multiline={largeInput}
      value={props.value}
    />
  )

  return (
    <BaseCell
      {...props}
      onClear={e => e.key === "Delete" && props.onChange("")}
      readContent={
        props.value ? (
          <UnselectedValue>{props.value}</UnselectedValue>
        ) : (
          <Placeholder>{props.placeholder}</Placeholder>
        )
      }
      editContent={
        largeInput ? (
          <div>
            <UnselectedValue>{props.value}</UnselectedValue>
            <SimpleDialog
              title="Editing Text Cell"
              open
              onClose={() => {
                unselectCell()
              }}
            >
              {editContentInput}
            </SimpleDialog>
          </div>
        ) : (
          <div>{editContentInput}</div>
        )
      }
    />
  )
}

export default TextCell
