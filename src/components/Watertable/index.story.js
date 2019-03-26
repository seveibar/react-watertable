// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import Watertable from "./"

storiesOf("Watertable", module)
  .add("README Example", () => (
    <Watertable
      tableName="README Example"
      schema={{
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
      }}
      data={[
        { name: "Charlie", color: "red" },
        { name: "Sarah", color: "blue" }
      ]}
    />
  ))
  .add("All Cell Types", () => (
    <Watertable
      tableName="All Cell Types"
      schema={{
        name: {
          title: "Name",
          type: "text"
        },
        color: {
          title: "Single Color",
          type: "select",
          options: [
            { value: "red", label: "Red", color: "#f00" },
            { value: "blue", label: "Blue", color: "#00f" }
          ]
        },
        allColors: {
          title: "Multiple Colors",
          type: "select",
          multiple: true,
          options: [
            { value: "red", label: "Red", color: "#f00" },
            { value: "blue", label: "Blue", color: "#00f" },
            { value: "green", label: "Green", color: "#0f0" }
          ]
        }
      }}
      data={[
        { name: "Charlie", color: "red" },
        { name: "Sarah", color: "blue" }
      ]}
    />
  ))
