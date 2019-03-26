// @flow

import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
import { useTheme } from "../Theme"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  button: { marginLeft: 2, marginRight: 2 },
  icon: { color: grey[700] },
  text: { marginLeft: 8, marginRight: 8 }
})

export const ConfigureButtonBase = props => {
  const c = useStyles()
  const { windowSize } = useTheme()
  return (
    <Button {...props} className={c.button}>
      <props.Icon className={c.icon} />
      {windowSize.innerWidth > 800 &&
        props.text && <div className={c.text}>{props.text}</div>}
    </Button>
  )
}

export default ConfigureButtonBase
