// @flow

import convert from "color-convert"

export const softenColor = (color?: string) => {
  if (!color) return

  const channels = color.includes("#")
    ? convert.hex.hsv(color.replace("#", ""))
    : convert.keyword.hsv(color)

  channels[1] = 120
  channels[2] = 100

  return "#" + convert.hsv.hex(channels)
}
