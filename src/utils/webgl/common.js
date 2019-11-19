export function getRGBFromColor(color) {
  color = color.startsWith('#') ? color.substr(1) : color
  const hex = color.split('')
  const r = parseInt(hex[0], 16) * 16 + parseInt(hex[1], 16)
  const g = parseInt(hex[2], 16) * 16 + parseInt(hex[3], 16)
  const b = parseInt(hex[4], 16) * 16 + parseInt(hex[5], 16)
  return {
    r: r,
    g: g,
    b: b
  }
}

export function getHexColorFromRGB(rgb) {
  return '#' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16)
}
