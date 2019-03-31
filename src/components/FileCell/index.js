// @flow

import React, { createContext, useContext, useCallback } from "react"
import BaseCell from "../BaseCell"
import Button from "@material-ui/core/Button"
import { useDropzone } from "react-dropzone"
import useEventCallback from "../../hooks/use-event-callback"

function isDataURL(s) {
  return !!s.match(isDataURL.regex)
}
isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i

const FileUploadContext = createContext({
  uploadFile: file => {
    return new Promise(resolve => {
      const fr = new FileReader()
      fr.onload = () => {
        resolve(fr.result)
      }
      fr.readAsDataURL(file)
    })
  }
})

const FileDisplay = ({ url }) => {
  if (!url) return null
  if (isDataURL(url) || url.endsWith("png") || url.endsWith("jpg")) {
    return <img style={{ width: 40, height: 40 }} src={url} />
  }
  return <a href={url}>Download</a>
}

export const FileCell = props => {
  const { uploadFile } = useContext(FileUploadContext)
  const onDrop = useEventCallback(async acceptedFiles => {
    try {
      const fileUrl = await uploadFile(acceptedFiles[0])
      props.onChange(fileUrl)
    } catch (e) {
      // TODO display error
    }
  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <BaseCell
      {...props}
      readContent={props.value && <FileDisplay url={props.value} />}
      editContent={
        <div style={{ display: "flex" }}>
          {props.value && <FileDisplay url={props.value} />}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button>Drop File</Button>
          </div>
        </div>
      }
    />
  )
}

export default FileCell
