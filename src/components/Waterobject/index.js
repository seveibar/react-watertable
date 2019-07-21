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
import { defaultDynamicTypes } from "../DynamicCell"
import getTypeFromValue from "../../lib/get-type-from-value.js"

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
  canAddMore,
  rawEdit,
  onChange,
  onSave
}) => {
  const c = useStyles()
  const theme = useTheme()
  const [newKey, onChangeNewKey] = useState("")
  const [rawEditing, changeRawEditing] = useState(Boolean(rawEdit))
  const controlled = Boolean(onChange)
  let data, changeData

  if (controlled) {
    data = inputData || {}
  } else {
    ;[data, changeData] = useState(inputData || {})
  }

  if (!schema) {
    if (canAddMore === undefined) canAddMore = true
    schema = useMemo(() => {
      const obj = {}
      for (const [k, v] of Object.entries(data || {})) {
        if (!obj[k]) {
          obj[k] = {
            ...getTypeFromValue(v),
            title: k
          }
        }
      }
      return obj
    }, [data])
  }

  const keys = Object.keys(schema)
  keys.sort()

  const keyColWidth = 150
  const rowHeight = 50

  const onCellChange = (key: string | number, value: any) => {
    if (onChange) return onChange({ ...data, [key]: value })
    changeData({
      ...data,
      [key]: value
    })
  }

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
                    value={schema[key].title || key}
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
              {canAddMore && (
                <Row>
                  <Cell
                    type="text"
                    width={keyColWidth}
                    height={50}
                    onChange={newValue => {
                      onChangeNewKey(newValue)
                    }}
                    first
                    value={newKey}
                    placeholder="New Row Key"
                  />
                  <Cell
                    type="select"
                    grow
                    options={defaultDynamicTypes}
                    onChange={newValue => {
                      onCellChange(
                        newKey,
                        defaultDynamicTypes.find(a => a.value === newValue)
                          .example
                      )
                      onChangeNewKey("")
                    }}
                    height={50}
                    last
                  />
                </Row>
              )}
            </SelectedCellProvider>
          </div>
        ) : (
          <div className={c.content}>
            <RawJSONEditor
              initialValue={data}
              onChange={newData => {
                onChange(newData)
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
