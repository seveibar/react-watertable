// @flow

import React, { useMemo } from "react"
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu"
import { makeStyles } from "@material-ui/styles"
import { grey } from "@material-ui/core/colors"
import MenuItem from "@material-ui/core/MenuItem"

const useStyles = makeStyles({
  row: {
    display: "flex",
    // borderBottom: "1px solid " + grey[400],
    "&:last-child": {
      borderBottom: "none"
    }
  },
  childContainer: {
    display: "flex",
    borderBottom: "1px solid " + grey[400]
  },
  menuContainer: {
    backgroundColor: "#fff",
    border: "1px solid " + grey[400],
    borderRadius: 2
  },
  menuItem: {
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16
  }
})

export const Row = ({ children, noMenu, onDelete }) => {
  const c = useStyles()
  const contextMenuId = useMemo(
    () => `contextmenu_${Math.random().toString()}`,
    []
  )
  if (noMenu)
    return (
      <div className={c.row}>
        <div className={c.childContainer}>{children}</div>
      </div>
    )
  return (
    <div className={c.row}>
      <ContextMenuTrigger id={contextMenuId}>
        <div className={c.childContainer}>{children}</div>
      </ContextMenuTrigger>
      <ContextMenu id={contextMenuId}>
        <div className={c.menuContainer}>
          <MenuItem onClick={onDelete} className={c.menuItem}>
            Delete Record
          </MenuItem>
        </div>
      </ContextMenu>
    </div>
  )
}

export default Row
