// @flow

import React, { useMemo } from "react"
import { makeStyles } from "@material-ui/styles"

import TableHeader from "../TableHeader"
import ColumnHeaderCell from "../ColumnHeaderCell"
import Cell from "../Cell"

const useStyles = makeStyles({})

export const Watertable = ({ schema, data, displayConfig, tableName }) => {
  const c = useStyles()

  // TODO columns should be memoized and ordered according to displayConfig
  const columns = Object.entries(schema).map(([id, def]) => ({
    id,
    ...def,
    width: 200
  }))
  return (
    <div className={c.root}>
      <TableHeader tableName={tableName} />
      {/* <ColumnHeaderCell /> */}
    </div>
  )
}
export default Watertable
