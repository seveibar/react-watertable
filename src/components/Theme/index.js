// @flow
import { install, makeStyles } from "@material-ui/styles"
install()

import React, { createContext, useContext } from "react"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import { blue } from "@material-ui/core/colors"
import useWindowSize from "@rehooks/window-size"
import ThemeProvider from "@material-ui/styles/ThemeProvider"

const useStyles = makeStyles({
  container: {
    fontFamily: '"Inter UI", sans-serif',
    "& a": {
      color: blue[500],
      textDecoration: "none"
    }
  }
})

const theme = {
  typography: {
    fontFamily: '"Inter UI", "Roboto", sans-serif'
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    }
  }
}
const themeOld = createMuiTheme(theme)

const ThemeContext = createContext({
  windowSize: {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  }
})

export const useTheme = () => useContext(ThemeContext)

export const Theme = ({ children }) => {
  const windowSize = useWindowSize()

  return (
    <ThemeContext.Provider
      value={{
        windowSize
      }}
    >
      <ThemeProvider theme={themeOld}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default Theme
