// @flow

import React from "react"
import { makeStyles } from "@material-ui/styles"

import { ConfigureFiltersButton } from "../ConfigureFilters"
import { ConfigureHiddenFieldsButton } from "../ConfigureHiddenFields"
import { ConfigureSortingButton } from "../ConfigureSorting"
import { ConfigureRowHeightButton } from "../ConfigureRowHeight"
import { SearchButton } from "../SearchBar"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center"
  },
  tableName: { marginRight: 10, fontWeight: "bold", color: grey[900] }
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
      <div style={{ flexGrow: 1 }} />
      <SearchButton />
    </div>
  )
}

export default TableHeader
