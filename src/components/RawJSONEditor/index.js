// @flow

import React from "react"
import { JsonEditor as Editor } from "jsoneditor-react"
import "jsoneditor-react/es/editor.min.css"
import ace from "brace"
import "brace/mode/json"
import "brace/theme/github"

export const RawJSONEditor = ({ initialValue, onChange }) => {
  return (
    <Editor
      value={initialValue}
      onChangeJSON={onChange}
      onChangeText={t => {
        try {
          onChange(JSON.parse(t))
        } catch (e) {}
      }}
      ace={ace}
      mode="code"
      allowedModes={["code", "tree"]}
      theme="ace/theme/github"
    />
  )
}

export default RawJSONEditor
