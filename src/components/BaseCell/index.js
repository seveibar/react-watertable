// @flow

import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import { useTheme } from "../Theme"
import { grey, blue } from "@material-ui/core/colors"
import useSelectedCell from "../../hooks/use-selected-cell"
import useEventCallback from "../../hooks/use-event-callback.js"

const useStyles = makeStyles({})

export const BaseCell = ({
  width,
  height,
  editable = true,
  first,
  last,
  grow,
  centered,
  bold,
  backgroundColor,
  editContent,
  readContent,
  onDeselect,
  onClear,
  children
}) => {
  const c = useStyles()
  const theme = useTheme()
  let selected, onSelect
  if (editable) {
    ;[selected, onSelect] = useSelectedCell()
  }
  const latestOnDeselect = useEventCallback(onDeselect)

  useEffect(() => {
    if (!window) return () => {}
    if (!selected) return () => {}
    const listener = e => {
      if (e.key === "Delete" || e.key === "Backspace") {
        onClear(e)
      }
    }

    window.addEventListener("keydown", listener)
    return () => {
      if (selected && onDeselect) latestOnDeselect()
      window.removeEventListener("keydown", listener)
    }
  }, [selected])

  return (
    <div
      className={c.root}
      onClick={onSelect}
      style={{
        height,
        cursor: !selected && editable ? "pointer" : undefined,
        // overflow: "hidden",
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 14,
        backgroundColor,
        color: grey[800],
        alignItems: "center",
        display: "flex",
        fontWeight: bold ? "bold" : undefined,
        backgroundColor: selected ? blue[50] : backgroundColor,
        justifyContent: centered ? "center" : "flex-start",
        flexGrow: grow ? 1 : undefined,
        ...(selected
          ? {
              border: selected ? "2px solid " + blue[400] : undefined,
              width: width - 1,
              height: height
            }
          : {
              width: first ? width : width - 1,
              borderLeft: first ? undefined : theme.borderStyle
            })
      }}
    >
      {!selected ? readContent || children : editContent || children}
    </div>
  )
}

export default BaseCell
