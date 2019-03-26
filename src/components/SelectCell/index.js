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

const customStyles = {
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
  })
}

export const SelectCell = props => {
  const c = useStyles()
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
  return (
    <BaseCell
      {...props}
      readContent={
        props.multiple ? (
          <div className={c.tagContainer}>
            {(props.value || []).map((t, i) => (
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
              backgroundColor: optionMap[props.value].color
            }}
          >
            {optionMap[props.value].label}
          </div>
        )
      }
      editContent={
        <div style={{ width: "100%", position: "relative" }}>
          <Select
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
            defaultValue={
              props.multiple
                ? (props.value || []).map(v => ({
                    value: v,
                    label: optionMap[v].label,
                    color: optionMap[v].color
                  }))
                : {
                    value: props.value,
                    label: optionMap[props.value].label,
                    color: optionMap[props.value].color
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
