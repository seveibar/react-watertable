// @flow

import React, { useState } from "react"
import BaseCell from "../BaseCell"
import InputBase from "@material-ui/core/InputBase"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import Waterobject from "../Waterobject"
import { makeStyles } from "@material-ui/styles"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  soft: {
    color: grey[600]
  }
})

export const JSONCell = props => {
  const c = useStyles()
  const [editing, changeEditing] = useState(false)
  return (
    <BaseCell {...props} centered>
      <div className={c.soft}>
        ({Object.keys(props.value || {}).length} Properties)
      </div>
      <Button onClick={() => changeEditing(true)}>Edit</Button>
      {editing && (
        <Dialog open onClose={() => changeEditing(false)}>
          <div style={{ minWidth: 500 }}>
            <Waterobject
              tableName={props.title}
              onChange={(key, val) => {
                props.onChange({ ...(props.value || {}), [key]: val })
              }}
              schema={props.schema}
              data={props.value}
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

export default JSONCell
