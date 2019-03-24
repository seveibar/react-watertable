import React from "react"
import { configure, addDecorator } from "@storybook/react"
import Theme from "../src/components/Theme"

addDecorator(storyFn => <Theme>{storyFn()}</Theme>)
function loadStories() {
  const importAll = r => r.keys().map(r)
  importAll(require.context("../src/components", true, /\.story\.js$/))
}

configure(loadStories, module)
