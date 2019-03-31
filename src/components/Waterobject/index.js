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
  contentContainer: {
    overflowX: "auto"
  },
  content: {},
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

export const Waterobject = ({
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
    data = inputData || {}
  } else {
    ;[data, changeData] = useState(inputData || {})
  }

  const keys = Object.keys(schema)
  keys.sort()

  const keyColWidth = 150
  const rowHeight = 50

  const onCellChange = (key: string | number, value: any) => {
    if (onChange) return onChange(key, value)
    changeData({
      ...data,
      [key]: value
    })
  }

  return (
    <div className={c.root}>
      <TableHeader tableName={tableName} onSave={onSave} />
      <div className={c.contentContainer}>
        <div className={c.content}>
          <Row>
            <ColumnHeaderCell
              width={keyColWidth}
              title="Key"
              type="text"
              first
              height={50}
            />
            <ColumnHeaderCell grow title="Value" type="any" last height={50} />
          </Row>
          <SelectedCellProvider>
            {keys.map((key, i) => (
              <Row key={i}>
                <Cell
                  type="text"
                  width={keyColWidth}
                  height={50}
                  editable={false}
                  onChange={newValue => onCellChange(key, newValue)}
                  first
                  value={schema[key].title}
                />
                <Cell
                  {...schema[key]}
                  grow
                  onChange={newValue => onCellChange(key, newValue)}
                  height={50}
                  last
                  value={data[key]}
                />
              </Row>
            ))}
          </SelectedCellProvider>
        </div>
      </div>
    </div>
  )
}
export default Waterobject
