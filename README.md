# React Watertable

A table with advanced editable controls. Great for admin panels, customer portals and building in-house tools where something like airtable would be used.

(insert screenshot here)

Watertable values simplicity, great user experience and extensive capability.

# Usage

```javascript
import React from "react"
import Watertable from "react-watertable"

const mySchema = {
  name: {
    title: "Name",
    type: "text"
  },
  color: {
    title: "Favorite Color",
    type: "select",
    options: [
      { value: "red", label: "Red", color: "#f00" },
      { value: "blue", label: "Blue", color: "#00f" }
    ]
  }
}

const MyApp = () => (
  <Watertable
    schema={mySchema}
    data={[{ name: "Charlie", color: "red" }, { name: "Sarah", color: "blue" }]}
  />
)
```

# Features

- Validate user input
- Editable/read-only cells
- Asynchronous row retrieval (i.e. make API calls to populate table)
- Asynchronous option retrieval/search
- Filtering and sorting
- Hiding columns
- Nested objects as cell values
- Custom cell types

# Props

| Props                 | Type                                                            | Description                                                                                                                                  |
| --------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| schema                | `{[ColumnName: string]: SchemaDefinition}`                      | Describes the data type of each column.                                                                                                      |
| data                  | `Array<Object>`                                                 | (optional) All the rows of the table.                                                                                                        |
| getData               | `(DataSearchQuery) => Promise<Array<Object>>`                   | (optional) Method to retrieve data.                                                                                                          |
| renderCell            | `(schemaInfo, value, onChange) => React.Component`              | (optional) Method to render a cell. Return null to fallback to watertable renderer.                                                          |
| onChange              | `(rowId, column, newValue) => any`                              | (optional) Called whenever a cell has changed.                                                                                               |
| onSave                | `(newData: Array<Object>) => any`                               | (optional) If specified, a save button is placed in the table header. This method is called on save press.                                   |
| getOptions            | `(columnName: string, input: string) => Promise<Array<Option>>` | (optional) Columns without static options will call this method on user input.                                                               |
| onChangeDisplayConfig | `(DisplayConfig) => any`                                        | (optional) Called whenever the view changes e.g. column width changes, filter applied. If not specified, all display configuration disabled. |
| onChangeSchema        | `(TableSchema) => any`                                          | (optional) Called when schema is modified. If not specified, schema changes are disabled.                                                    |
| onUpdateCell          |                                                                 |                                                                                                                                              |
| onDeleteRow           |                                                                 |                                                                                                                                              |
| canAddMore            |                                                                 |                                                                                                                                              |
| canDelete             |                                                                 |
| recordActions         |                                                                 |
