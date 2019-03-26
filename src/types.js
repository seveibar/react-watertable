// @flow

export type BaseColumn = {|
  title: string,
  multiple?: boolean,
  primary?: boolean
|}

export type TextColumn = {|
  ...BaseColumn,
  type: "text"
|}

export type SelectColumn = {|
  ...BaseColumn,
  type: "select",
  options: Array<{ value: string, label: string, color?: string } | string>
|}

export type FileColumn = {|
  ...BaseColumn,
  type: "file"
|}

export type ImageColumn = {|
  ...BaseColumn,
  type: "image"
|}

export type BooleanColumn = {|
  ...BaseColumn,
  type: "boolean"
|}

export type NumericColumn = {|
  ...BaseColumn,
  type: "numeric"
|}

export type ColumnSchema =
  | TextColumn
  | SelectColumn
  | FileColumn
  | ImageColumn
  | BooleanColumn
  | NumericColumn

export type TableSchema = {
  [columnId: string]: ColumnSchema
}
