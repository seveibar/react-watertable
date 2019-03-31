// @flow

import React, { useState } from "react"
import { makeStyles } from "@material-ui/styles"
import { useTheme } from "../Theme"
import { grey, blue } from "@material-ui/core/colors"
import useSelectedCell from "../../hooks/use-selected-cell"

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
  children
}) => {
  const c = useStyles()
  const theme = useTheme()
  let selected, onSelect
  if (editable) {
    ;[selected, onSelect] = useSelectedCell()
  }

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
              width: width - 4,
              height: height - 4
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
