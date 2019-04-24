// @flow

import React, { useMemo, useState } from "react"
import { makeStyles } from "@material-ui/styles"

import TableHeader from "../TableHeader"
import ColumnHeaderCell from "../ColumnHeaderCell"
import Cell from "../Cell"
import { useTheme } from "../Theme"
import { grey } from "@material-ui/core/colors"
import { SelectedCellProvider } from "../../hooks/use-selected-cell"
import { saveAs } from "file-saver"
import isEqual from "lodash/isEqual"
import RawJSONEditor from "../RawJSONEditor"

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
  downloadable,
  rawEdit,
  onChange,
  onSave
}) => {
  const c = useStyles()
  const theme = useTheme()
  const [rawEditing, changeRawEditing] = useState(Boolean(rawEdit))
  const controlled = Boolean(onChange)
  let data, changeData

  if (controlled) {
    data = inputData || {}
  } else {
    ;[data, changeData] = useState(inputData || {})
  }

  if (!schema)
    schema = useMemo(
      () => {
        const obj = {}
        for (const [k, v] of Object.entries(data || {})) {
          if (!obj[k]) {
            if (typeof v === "string" || typeof v === "number") {
              obj[k] = { type: "text", title: k }
            } else if (typeof v === "boolean") {
              obj[k] = { type: "boolean", title: k }
            } else if (
              Array.isArray(v) &&
              (typeof v[0] === "string" || typeof v[0] === "number")
            ) {
              obj[k] = { type: "text", multiple: true, title: k }
            } else if (Array.isArray(v) && typeof v[0] === "object") {
              obj[k] = { type: "json-array", title: k }
            } else if (typeof v === "object") {
              obj[k] = { type: "json", title: k }
            }
          }
        }
        return obj
      },
      [data]
    )

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

  // const onObjectChange = (newObj: Object) => {
  //   for (const k of new Set(Object.keys(newObj).concat(Object.keys(data)))) {
  //     if (!isEqual(newObj[k], data[k])) {
  //       if (onChange) onChange(k, newObj[k])
  //     }
  //   }
  //   changeData(newObj)
  // }

  return (
    <div className={c.root}>
      <TableHeader
        tableName={tableName}
        onSave={onSave}
        onDownload={
          downloadable
            ? () =>
                saveAs(new Blob([JSON.stringify(data)]), `${tableName}.json`)
            : undefined
        }
        onToggleRawEdit={() => changeRawEditing(!rawEditing)}
      />
      <div className={c.contentContainer}>
        {!rawEditing ? (
          <div className={c.content}>
            <Row>
              <ColumnHeaderCell
                width={keyColWidth}
                title="Key"
                type="text"
                first
                height={50}
              />
              <ColumnHeaderCell
                grow
                title="Value"
                type="any"
                last
                height={50}
              />
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
        ) : (
          <div className={c.content}>
            <RawJSONEditor
              initialValue={data}
              onChange={newData => {
                const allKeys = new Set(
                  Object.keys(newData).concat(Object.keys(data))
                )
                for (const key of allKeys) {
                  if (!isEqual(newData[key], data[key])) {
                    if (onChange) onChange(key, newData[key])
                  }
                }
                changeData(newData)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Waterobject
