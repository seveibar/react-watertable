// @flow

import React, { useState } from "react"
import Cell from "../Cell"
import { customStyles } from "../SelectCell"
import type { ColumnSchema } from "../../types"
import DropdownIcon from "@material-ui/icons/ArrowDropDown"
import { blue } from "@material-ui/core/colors"
import Select from "react-select"
import TypeIcon from "../TypeIcon"

const defaultDynamicTypes = [
  { value: { type: "text" }, label: "Text" },
  { value: { type: "markdown" }, label: "Markdown" },
  { value: { type: "boolean" }, label: "Boolean" },
  { value: { type: "numeric" }, label: "Numeric" },
  { value: { type: "json" }, label: "JSON" },
  { value: { type: "json-array" }, label: "JSON Array" }
]

export default (props: ColumnSchema) => {
  const [typesOpen, changeTypesOpen] = useState(false)
  const [currentType, changeCurrentType] = useState(() => {
    if (props.value) {
      if (typeof props.value === "string")
        return props.value.trim().startsWith("#") ? "markdown" : "text"
      if (
        Array.isArray(props.value) &&
        props.length > 0 &&
        typeof props.value[0] === "object"
      )
        return "json-array"
      // TODO support multi selects w/ dynamic values
      if (typeof props.value === "object") return "json"
      if (typeof props.value === "number") return "numeric"
      if (typeof props.value === "boolean") return "boolean"
    }
    return props.defaultType || "text"
  })

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        flexGrow: 1,
        paddingRight: 34,
        overflow: "hidden"
      }}
    >
      {typesOpen ? (
        <div style={{ width: "100%" }}>
          <Select
            menuPortalTarget={document.body}
            components={{ ClearIndicator: null }}
            styles={customStyles}
            autoFocus
            onChange={v => {
              changeCurrentType(v.value.type)
              props.onChange(undefined)
              changeTypesOpen(false)
            }}
            defaultMenuIsOpen
            value={defaultDynamicTypes.find(a => a.value.type === currentType)}
            options={defaultDynamicTypes}
          />
        </div>
      ) : (
        <Cell {...props} type={currentType} />
      )}
      <div
        onClick={() => {
          changeTypesOpen(!typesOpen)
        }}
        style={{
          position: "absolute",
          top: 8,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          right: 8,
          backgroundColor: blue[300],
          border: `2px solid ${blue[500]}`,
          borderRadius: 3,
          cursor: "pointer",
          color: "#fff",
          width: 18,
          height: 18,
          fontSize: 12,
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        {!typesOpen ? (
          <TypeIcon
            style={{ width: 14, height: 14, fontSize: 12, textAlign: "center" }}
            type={currentType}
          />
        ) : (
          "V"
        )}
      </div>
    </div>
  )
}
