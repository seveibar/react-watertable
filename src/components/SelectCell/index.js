// @flow
import React, { useMemo } from "react"
import BaseCell from "../BaseCell"
import Select from "react-select"
import { grey, blue } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/styles"
import { softenColor } from "../../colors"

const useStyles = makeStyles({
  tagContainer: { display: "flex" },
  tag: {
    margin: 4,
    padding: 4,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 4
  }
})

export const customStyles = {
  container: provided => ({
    ...provided,
    border: "none",
    backgroundColor: blue[50]
  }),
  control: provided => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    backgroundColor: blue[50]
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    backgroundColor: softenColor(state.data.color)
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    backgroundColor: softenColor(state.data.color)
  }),
  singleValue: (provided, state) => ({
    ...provided,
    padding: 4,
    borderRadius: 4,
    backgroundColor: softenColor(state.data.color)
  }),
  option: (provided, state) => ({
    ...provided,
    color: "rgba(0,0,0,0.8)",
    backgroundColor: softenColor(state.data.color)
  }),
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 99999
  })
}

export const SelectCell = props => {
  const c = useStyles()
  if (!props.options) throw new Error("Missing Options for SelectCell")
  const optionMap = useMemo(() => {
    const om = {}
    for (let option of props.options) {
      om[option.value] = {
        ...option,
        color: softenColor(option.color) || grey[50]
      }
    }
    return om
  }, props.options)
  const values =
    props.value === undefined
      ? []
      : typeof props.value === "string"
      ? [props.value]
      : props.value || []

  const invalidValue = values.find(v => !optionMap[v])
  if (invalidValue)
    throw new Error(
      `Value "${invalidValue}" not found in options. Options are: "${JSON.stringify(
        props.options
      )}"`
    )

  return (
    <BaseCell
      {...props}
      onClear={() => {
        if (props.multiple) return props.onChange([])
        return props.onChange(undefined)
      }}
      readContent={
        props.multiple ? (
          <div className={c.tagContainer}>
            {values.map((t, i) => (
              <div
                key={i}
                className={c.tag}
                style={{ backgroundColor: optionMap[t].color }}
              >
                {optionMap[t].label}
              </div>
            ))}
          </div>
        ) : (
          <div
            className={c.tag}
            style={{
              backgroundColor: props.value
                ? optionMap[props.value].color
                : "#fff"
            }}
          >
            {props.value ? optionMap[props.value].label : ""}
          </div>
        )
      }
      editContent={
        <div style={{ width: "100%", position: "relative" }}>
          <Select
            menuPortalTarget={document.body}
            components={{ ClearIndicator: null }}
            styles={customStyles}
            autoFocus
            onChange={v => {
              if (props.multiple) {
                props.onChange(v.map(a => a.value))
              } else {
                props.onChange(v.value)
              }
            }}
            value={
              props.multiple
                ? (props.value || []).map(v => ({
                    value: v,
                    label: optionMap[v].label,
                    color: optionMap[v].color
                  }))
                : {
                    value: props.value,
                    label: props.value
                      ? optionMap[props.value].label
                      : undefined,
                    color: props.value
                      ? optionMap[props.value].color
                      : undefined
                  }
            }
            isMulti={props.multiple}
            options={props.options}
          />
        </div>
      }
    />
  )
}

export default SelectCell
