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
import { makeStyles } from "@material-ui/styles"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  soft: {
    color: grey[600]
  }
})

export const JSONArrayCell = props => {
  const c = useStyles()
  const [editing, changeEditing] = useState(false)
  const columns = Object.entries(props.schema).map(([id, def]) => ({
    id,
    ...def
  }))
  const primaryCol = columns.find(col => col.primary)
  const primaryKey = primaryCol ? primaryCol.id : undefined
  return (
    <BaseCell {...props} centered>
      <div className={c.soft}>({(props.value || []).length} Items)</div>
      <Button onClick={() => changeEditing(true)}>Edit</Button>
      {editing && (
        <Dialog open onClose={() => changeEditing(false)}>
          <div style={{ minWidth: 500 }}>
            <Watertable
              tableName={props.title}
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
