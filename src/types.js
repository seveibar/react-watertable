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

export type TextArrayColumn = {|
  ...BaseColumn,
  type: "text-array"
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

export type MarkdownColumn = {|
  ...BaseColumn,
  type: "markdown"
|}

export type JSONColumn = {|
  ...BaseColumn,
  type: "json",
  multiple?: false,
  schema?: ColumnSchema
|}

export type JSONArrayColumn = {|
  ...BaseColumn,
  type: "json-array",
  multiple?: false,
  schema?: ColumnSchema
|}

export type DynamicColumn = {|
  ...BaseColumn,
  type: "dynamic",
  defaultType: string
|}

export type ColumnSchema =
  | TextColumn
  | SelectColumn
  | FileColumn
  | ImageColumn
  | BooleanColumn
  | NumericColumn
  | JSONColumn
  | JSONArrayColumn
  | MarkdownColumn
  | DynamicColumn

export type TableSchema = {
  [columnId: string]: ColumnSchema
}
