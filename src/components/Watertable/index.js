// @flow

import React, { useMemo, useState } from "react"
import { makeStyles } from "@material-ui/styles"

import TableHeader from "../TableHeader"
import ColumnHeaderCell from "../ColumnHeaderCell"
import Cell from "../Cell"
import { useTheme } from "../Theme"
import { grey } from "@material-ui/core/colors"
import { SelectedCellProvider } from "../../hooks/use-selected-cell"

const useStyles = makeStyles({
  root: {
    border: "1px solid " + grey[400],
    borderRadius: 2
  },
  row: {
    display: "flex",
    borderBottom: "1px solid " + grey[400],
    "&:last-child": {
      borderBottom: "none"
    }
  }
})

const Row = ({ children }) => {
  const c = useStyles()
  return <div className={c.row}>{children}</div>
}

const FillerCell = ({ height, style = {} }) => {
  const theme = useTheme()
  return (
    <div
      style={{
        height,
        flexGrow: 1,
        borderLeft: theme.borderStyle,
        ...style
      }}
    />
  )
}

export const Watertable = ({
  schema,
  data: inputData,
  displayConfig,
  tableName,
  onChange,
  onSave
}) => {
  const c = useStyles()
  const theme = useTheme()
  const controlled = Boolean(onChange)
  let data, changeData

  if (controlled) {
    data = inputData
  } else {
    ;[data, changeData] = useState(inputData)
  }

  const rowHeight = 50

  // TODO columns should be memoized and ordered according to displayConfig
  const columns = Object.entries(schema).map(([id, def]) => ({
    id,
    ...def,
    width: 200,
    height: rowHeight
  }))

  const primaryCol = columns.find(col => col.primary)
  const primaryKey = primaryCol ? primaryCol.id : undefined

  const onCellChange = (key: string | number, col: string, value: any) => {
    if (onChange) return onChange(key, col, value)
    let newData = []
    for (let i = 0; i < data.length; i++) {
      const rowId = primaryKey ? data[i][primaryKey] : i
      if (rowId !== key) {
        newData.push(data[i])
      } else {
        newData.push({
          ...data[i],
          [col]: value
        })
      }
    }
    changeData(newData)
  }

  return (
    <div className={c.root}>
      <TableHeader tableName={tableName} onSave={onSave} />
      <Row>
        <ColumnHeaderCell type="numeric" width={40} first height={40} />
        {columns.map((col, i) => (
          <ColumnHeaderCell
            key={i}
            {...col}
            last={i === columns.length - 1}
            height={40}
          />
        ))}
        <FillerCell
          height={40}
          style={{
            backgroundColor: grey[200]
          }}
        />
      </Row>
      <SelectedCellProvider>
        {data.map((row, i) => (
          <Row key={i}>
            <Cell first type="text" editable={false} value={i + 1} width={40} />
            {columns.map((col, u) => (
              <Cell
                key={u}
                {...col}
                onChange={newValue =>
                  onCellChange(
                    primaryKey ? row[primaryKey] : i,
                    col.id,
                    newValue
                  )
                }
                last={u === columns.length - 1}
                value={row[col.id]}
              />
            ))}
            <FillerCell height={rowHeight} />
          </Row>
        ))}
      </SelectedCellProvider>
    </div>
  )
}
export default Watertable
