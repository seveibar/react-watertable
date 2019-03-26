// @flow

import React, { useState } from "react"
import { makeStyles } from "@material-ui/styles"
import BaseCell from "../BaseCell"
import { grey } from "@material-ui/core/colors"
import TypeIcon from "../TypeIcon"

const useStyles = makeStyles({
  content: {
    display: "flex",
    alignItems: "center"
  }
})

export const ColumnHeaderCell = props => {
  const c = useStyles()
  return (
    <BaseCell {...props} backgroundColor={grey[200]}>
      <div className={c.content}>
        <TypeIcon
          type={props.type}
          multiple={props.multiple}
          style={{ marginRight: 10, width: 16, height: 16 }}
        />
        <div className={c.text}>{props.title}</div>
        <div style={{ flexGrow: 1 }} />
        {/* eventually the dropdown */}
      </div>
    </BaseCell>
  )
}

export default ColumnHeaderCell
