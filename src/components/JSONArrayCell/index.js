// @flow

import React, { useState } from "react"
import BaseCell from "../BaseCell"
import InputBase from "@material-ui/core/InputBase"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import Watertable from "../Watertable"

export const JSONArrayCell = props => {
  const [editing, changeEditing] = useState(false)
  const columns = Object.entries(props.schema).map(([id, def]) => ({
    id,
    ...def
  }))
  const primaryCol = columns.find(col => col.primary)
  const primaryKey = primaryCol ? primaryCol.id : undefined
  return (
    <BaseCell {...props} centered>
      <Button onClick={() => changeEditing(true)}>Edit</Button>
      {editing && (
        <Dialog open onClose={() => changeEditing(false)}>
          <div style={{ minWidth: 500 }}>
            <Watertable
              tableName={props.title}
              // onChange={(key, col, val) => {
              //   const data = props.value || []
              //   let newData = []
              //   let cellEdited = false
              //   for (let i = 0; i < data.length; i++) {
              //     const rowId = primaryKey ? data[i][primaryKey] : i
              //     if (rowId !== key) {
              //       newData.push(data[i])
              //     } else {
              //       cellEdited = true
              //       newData.push({
              //         ...data[i],
              //         [col]: val
              //       })
              //     }
              //   }
              //   if (!cellEdited) {
              //     // create new row
              //     newData.push({ [col]: val })
              //   }
              //   props.onChange(newData)
              // }}
              onChangeData={data => props.onChange(data)}
              schema={props.schema}
              data={props.value || []}
            />
          </div>
          <DialogActions>
            <Button onClick={() => changeEditing(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </BaseCell>
  )
}

export default JSONArrayCell
