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
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"

const useStyles = makeStyles({
  soft: {
    color: grey[600]
  }
})

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

export const MarkdownCell = props => {
  const c = useStyles()
  const [selectedTab, changeSelectedTab] = useState("write")
  const [editing, changeEditing] = useState(false)
  return (
    <BaseCell {...props} centered>
      <Button onClick={() => changeEditing(true)}>
        {(props.value || "").slice(0, 18) + "..."}
      </Button>
      {editing && (
        <Dialog open onClose={() => changeEditing(false)}>
          <div style={{ minWidth: 500 }}>
            <ReactMde
              selectedTab={selectedTab}
              onTabChange={changeSelectedTab}
              onChange={newValue => props.onChange(newValue)}
              value={props.value || ""}
              generateMarkdownPreview={md =>
                Promise.resolve(converter.makeHtml(md))
              }
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

export default MarkdownCell
