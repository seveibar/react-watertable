// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import Waterobject from "./"

storiesOf("Waterobject", module)
  .add("Basic", () => (
    <Waterobject
      onChange={action("onChange")}
      tableName="Water Object"
      schema={{
        text: {
          title: "Name",
          type: "text"
        },
        selection: {
          title: "Single Color",
          type: "select",
          options: [
            { value: "red", label: "Red", color: "#f00" },
            { value: "blue", label: "Blue", color: "#00f" }
          ]
        },
        multipleSelection: {
          title: "Multiple Colors",
          type: "select",
          multiple: true,
          options: [
            { value: "red", label: "Red", color: "#f00" },
            { value: "blue", label: "Blue", color: "#00f" },
            { value: "green", label: "Green", color: "#0f0" }
          ]
        },
        checkbox: {
          title: "Likes Dogs",
          type: "boolean"
        }
      }}
      data={{
        text: "This is some text",
        checkbox: true,
        selection: "red",
        multipleSelection: ["red", "blue"]
      }}
    />
  ))
  .add("Freeform/Schemaless", () => (
    <Waterobject
      onChange={action("onChange")}
      tableName="Water Object"
      data={{
        text: "This is some text",
        checkbox: true,
        selection: "red",
        multipleSelection: ["red", "blue"]
      }}
    />
  ))
