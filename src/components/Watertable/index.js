// @flow

import React, { useMemo, useState } from "react"
import { makeStyles } from "@material-ui/styles"
import type { ColumnSchema } from "../../types"

import TableHeader from "../TableHeader"
import ColumnHeaderCell from "../ColumnHeaderCell"
import Cell from "../Cell"
import BaseCell from "../BaseCell"
import { useTheme } from "../Theme"
import { grey } from "@material-ui/core/colors"
import { SelectedCellProvider } from "../../hooks/use-selected-cell"
import Button from "@material-ui/core/Button"
import Row from "./Row"
import { saveAs } from "file-saver"
import getTypeFromValue from "../../lib/get-type-from-value.js"

const useStyles = makeStyles({
  root: {
    border: "1px solid " + grey[400],
    borderRadius: 2
  },
  contentContainer: {
    overflowX: "auto"
  },
  content: {}
})

const FillerCell = ({
  height,
  style = {}
}: {
  height: number,
  style?: Object
}) => {
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

export type Props = {
  schema?: ColumnSchema,
  tableName: string,
  data: Array<Object>,
  onChangeData: (Array<Object>) => any,
  onUpdateCell: (key: string, col: string, val: any) => any,
  onDeleteRow?: any,
  canDelete?: boolean,
  canAddMore?: boolean,
  recordActions?: Array<string>,
  onClickRecordAction?: string => any,
  onSave?: Function
}

export const Watertable = ({
  schema,
  data: inputData,
  displayConfig,
  tableName,
  downloadable,
  onUpdateCell,
  onChangeData,
  canAddColumns,
  canAddMore = true,
  canDelete = true,
  onDeleteRow: onDeleteRowProp,
  recordActions = [],
  onClickRecordAction,
  onSave
}: Props) => {
  const c = useStyles()
  const theme = useTheme()
  const controlled = Boolean(onUpdateCell)
  let data, changeData

  if (controlled) {
    data = inputData
  } else {
    ;[data, changeData] = useState(inputData)
  }

  const [newCol, changeNewCol] = useState("")
  const [newSchema, changeNewSchema] = useState({})

  if (!schema) {
    if (canAddColumns === undefined) canAddColumns = true
    schema = useMemo(() => {
      const obj = {}
      for (const row of data) {
        for (const [k, v] of Object.entries(row)) {
          if (!obj[k]) {
            obj[k] = {
              ...getTypeFromValue(v),
              title: k
            }
          }
        }
      }
      return { ...obj, ...newSchema }
    }, [data, newSchema])
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

  const onDeleteRow = (key: string | number) => {
    const rowToDelete = data.find((row, i) => {
      return primaryKey ? row[primaryKey] === key : i === key
    })
    if (onDeleteRowProp) return onDeleteRowProp(rowToDelete)
    const newData = [...data]
    newData.splice(data.indexOf(rowToDelete), 1)
    changeData(newData)
    if (onChangeData) onChangeData(newData)
  }

  const onCellChange = (key: string | number, col: string, value: any) => {
    if (onUpdateCell) return onUpdateCell(key, col, value)
    let newData = []
    let cellEdited = false
    for (let i = 0; i < data.length; i++) {
      const rowId = primaryKey ? data[i][primaryKey] : i
      if (rowId !== key) {
        newData.push(data[i])
      } else {
        cellEdited = true
        newData.push({
          ...data[i],
          [col]: value
        })
      }
    }
    if (!cellEdited) {
      // create new row
      newData.push({ [col]: value })
    }
    changeData(newData)
    if (onChangeData) onChangeData(newData)
  }

  return (
    <div className={c.root}>
      <TableHeader
        tableName={tableName}
        onSave={onSave ? () => onSave(data) : undefined}
        onDownload={
          downloadable
            ? () =>
                saveAs(new Blob([JSON.stringify(data)]), `${tableName}.json`)
            : undefined
        }
      />
      <div className={c.contentContainer}>
        <div
          className={c.content}
          style={{ minWidth: columns.reduce((s, c) => s + c.width, 0) }}
        >
          <Row noMenu>
            <ColumnHeaderCell type="numeric" width={40} first height={40} />
            {columns.map((col, i) => (
              <ColumnHeaderCell
                key={i}
                {...col}
                last={!canAddColumns && i === columns.length - 1}
                height={40}
              />
            ))}
            {canAddColumns && (
              <SelectedCellProvider>
                <Cell
                  width={200}
                  onChange={changeNewCol}
                  onDeselect={() => {
                    if (newCol === "") return
                    changeNewSchema({
                      ...newSchema,
                      [newCol]: {
                        type: "dynamic",
                        title: newCol
                      }
                    })
                    changeNewCol("")
                  }}
                  editable
                  type="text"
                  last
                  height={40}
                  value={newCol}
                />
              </SelectedCellProvider>
            )}
            <FillerCell
              height={40}
              style={{
                backgroundColor: grey[200]
              }}
            />
          </Row>
          <SelectedCellProvider>
            {(canAddMore ? data.concat([{}]) : data).map((row, i) => (
              <Row
                key={i}
                onClickAction={action => onClickRecordAction(row, action)}
                actions={recordActions}
                canDelete={canDelete}
                onDelete={() => onDeleteRow(primaryKey ? row[primaryKey] : i)}
              >
                <Cell
                  first
                  type="text"
                  editable={false}
                  value={i + 1}
                  width={40}
                />
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
      </div>
    </div>
  )
}
export default Watertable
