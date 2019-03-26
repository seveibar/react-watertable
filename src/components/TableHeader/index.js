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

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid " + grey[400]
  },
  tableName: { marginRight: 16, fontWeight: "bold", color: grey[900] }
})

export const TableHeader = ({ tableName }) => {
  const c = useStyles()

  return (
    <div className={c.root}>
      <div className={c.tableName}>{tableName}</div>
      <ConfigureHiddenFieldsButton />
      <ConfigureFiltersButton />
      <ConfigureSortingButton />
      <ConfigureRowHeightButton />
      <ConfigureButtonBase Icon={SaveIcon} text="Save" />
      <div style={{ flexGrow: 1 }} />
      <SearchButton />
    </div>
  )
}

export default TableHeader
