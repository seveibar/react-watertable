// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import Waterobject from "../Waterobject"

storiesOf("Dynamic Cells", module).add("Basic", () => (
  <Waterobject
    downloadable
    onChange={action("onChange")}
    tableName="Water Object"
    schema={{
      dynamicCellNoValue: {
        type: "dynamic",
        defaultType: "text"
      },
      dynamicCellText: {
        type: "dynamic",
        defaultType: "text"
      },
      dynamicCellMarkdown: {
        type: "dynamic",
        defaultType: "text"
      },
      dynamicCellJSON: {
        type: "dynamic",
        defaultType: "text"
      },
      dynamicCellJSONArray: {
        type: "dynamic",
        defaultType: "text"
      }
    }}
    data={{
      dynamicCellText: "Hello World",
      dynamicCellMarkdown: "#This is a header",
      dynamicCellJSON: { a: 1, b: 2, c: 3 },
      dynamicCellJSONArray: [{ a: 1 }, { b: 2 }, { a: 3 }]
    }}
  />
))
