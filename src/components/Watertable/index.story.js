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
      onChangeData={action("onChangeData")}
    />
  ))
  .add("All Cell Types", () => (
    <Watertable
      tableName="All Cell Types"
      downloadable
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
        },
        likesDogs: {
          title: "Likes Dogs",
          type: "boolean"
        },
        profile: {
          title: "Profile",
          type: "json",
          schema: {
            nickname: { title: "Nick Name", type: "text" },
            allergies: {
              title: "Allergies",
              type: "select",
              multiple: true,
              options: [
                { value: "peanuts", label: "Peanuts" },
                { value: "lactose", label: "Lactose" }
              ]
            }
          }
        },
        todoList: {
          title: "TODO List",
          type: "json-array",
          schema: {
            task: { title: "Task", type: "text" },
            done: { title: "Done", type: "boolean" }
          }
        },
        todoListJSON: {
          title: "TODO List (Schemaless)",
          type: "json",
          editable: false
        },
        someFile: {
          title: "Some File",
          type: "file"
        },
        markdown: {
          title: "Markdown Cells",
          type: "markdown"
        },
        numeric: { title: "Numeric", type: "numeric" },
        dynamic: {
          title: "Dynamic Cell",
          type: "dynamic"
        }
      }}
      data={[
        {
          name: "Charlie",
          color: "red",
          likesDogs: true,
          allColors: ["blue", "green"],
          todoList: [{ task: "Rake Leaves", done: true }],
          todoListJSON: [{ task: "Rake Leaves", done: true }]
        },
        { name: "Sarah", color: "blue" }
      ]}
      onChangeData={action("onChangeData")}
      recordActions={["Reset"]}
      onClickRecordAction={action("onClickRecordAction")}
    />
  ))
  .add("All Cell Types Read Only", () => (
    <Watertable
      tableName="All Cell Types"
      schema={{
        name: {
          title: "Name",
          type: "text",
          editable: false
        },
        color: {
          title: "Single Color",
          type: "select",
          options: [
            { value: "red", label: "Red", color: "#f00" },
            { value: "blue", label: "Blue", color: "#00f" }
          ],
          editable: false
        },
        allColors: {
          title: "Multiple Colors",
          type: "select",
          multiple: true,
          options: [
            { value: "red", label: "Red", color: "#f00" },
            { value: "blue", label: "Blue", color: "#00f" },
            { value: "green", label: "Green", color: "#0f0" }
          ],
          editable: false
        },
        likesDogs: {
          title: "Likes Dogs",
          type: "boolean",
          editable: false
        },
        profile: {
          title: "Profile",
          type: "json",
          schema: {
            nickname: { title: "Nick Name", type: "text" },
            allergies: {
              title: "Allergies",
              type: "select",
              multiple: true,
              options: [
                { value: "peanuts", label: "Peanuts" },
                { value: "lactose", label: "Lactose" }
              ]
            }
          },
          editable: false
        },
        todoList: {
          title: "TODO List",
          type: "json-array",
          schema: {
            task: { title: "Task", type: "text" },
            done: { title: "Done", type: "boolean" }
          },
          editable: false
        },
        someFile: {
          title: "Some File",
          type: "file",
          editable: false
        },
        markdown: {
          title: "Markdown Cells",
          type: "markdown",
          editable: false
        }
      }}
      data={[
        {
          name: "Charlie",
          color: "red",
          likesDogs: true,
          allColors: ["blue", "green"],
          todoList: [{ task: "Rake Leaves", done: true }]
        },
        { name: "Sarah", color: "blue" }
      ]}
      canDelete={false}
      onChangeData={action("onChangeData")}
    />
  ))
  .add("Schemaless, No Items", () => (
    <Watertable
      tableName="Schemaless No Items"
      data={[]}
      onChangeData={action("onChangeData")}
    />
  ))
  .add("Schemaless Long Text Field", () => (
    <Watertable
      tableName="Schemaless No Items"
      data={[
        {
          name:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere, tellus vitae accumsan finibus, quam diam aliquam lacus, in dictum lectus sem sit amet quam. Vestibulum nec eros ipsum. Sed auctor maximus purus, non dictum enim lacinia eget. Sed magna turpis, sollicitudin at consequat a, luctus eu enim. Nam sagittis massa arcu, ut cursus sem molestie ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sapien lorem, vehicula ut felis ac, blandit molestie eros. Donec dolor orci, bibendum vel ornare sit amet, semper id eros. Fusce consequat lacinia neque non feugiat.",
          color: "red"
        },
        {
          name:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere, tellus vitae accumsan finibus, quam diam aliquam lacus, in dictum lectus sem sit amet quam. Vestibulum nec eros ipsum. Sed auctor maximus purus, non dictum enim lacinia eget. Sed magna turpis, sollicitudin at consequat a, luctus eu enim. Nam sagittis massa arcu, ut cursus sem molestie ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sapien lorem, vehicula ut felis ac, blandit molestie eros. Donec dolor orci, bibendum vel ornare sit amet, semper id eros. Fusce consequat lacinia neque non feugiat.",
          color: "blue"
        }
      ]}
      onChangeData={action("onChangeData")}
    />
  ))
