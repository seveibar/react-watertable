// @flow

import React from "react"
import { makeStyles } from "@material-ui/styles"

import ConfigureButtonBase from "../ConfigureButtonBase"
import { ConfigureFiltersButton } from "../ConfigureFilters"
import { ConfigureHiddenFieldsButton } from "../ConfigureHiddenFields"
import { ConfigureSortingButton } from "../ConfigureSorting"
import { ConfigureRowHeightButton } from "../ConfigureRowHeight"
import { SearchButton } from "../SearchBar"
import { grey } from "@material-ui/core/colors"
import SaveIcon from "@material-ui/icons/Save"
import NoteAdd from "@material-ui/icons/NoteAdd"
import DownloadIcon from "@material-ui/icons/CloudDownload"
import EditIcon from "@material-ui/icons/Edit"

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid " + grey[400],
    minHeight: 40
  },
  tableName: { marginRight: 16, fontWeight: "bold", color: grey[900] }
})

export const TableHeader = ({
  tableName,
  onSave,
  onDownload,
  onToggleRawEdit,
  onAddColumn
}) => {
  const c = useStyles()

  return (
    <div className={c.root}>
      <div className={c.tableName}>{tableName}</div>
      {/* <ConfigureHiddenFieldsButton /> */}
      {/* <ConfigureFiltersButton /> */}
      {/* <ConfigureSortingButton /> */}
      {/* <ConfigureRowHeightButton /> */}
      {onSave && (
        <ConfigureButtonBase onClick={onSave} Icon={SaveIcon} text="Save" />
      )}
      {onDownload && (
        <ConfigureButtonBase
          onClick={onDownload}
          Icon={DownloadIcon}
          text="Download"
        />
      )}
      {onToggleRawEdit && (
        <ConfigureButtonBase
          onClick={onToggleRawEdit}
          Icon={EditIcon}
          text="Raw Edit"
        />
      )}
      {onAddColumn && (
        <ConfigureButtonBase
          onClick={onAddColumn}
          Icon={NoteAdd}
          text="Add Column"
        />
      )}
      <div style={{ flexGrow: 1 }} />
      {/* <SearchButton /> */}
    </div>
  )
}

export default TableHeader
