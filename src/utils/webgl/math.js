// ;(function(lib3d) {
const deg2radian = Math.PI / 180
const radian2deg = 180 / Math.PI

function deg2radians(deg) {
  return deg2radian * deg
}

function radians2deg(radians) {
  return radian2deg * radians
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max))
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

// lib3d.math = {
//   deg2radians,
//   radians2deg,
//   deg2radian,
//   radian2deg,
//   clamp,
//   rand
// }
export default {
  deg2radians,
  radians2deg,
  deg2radian,
  radian2deg,
  clamp,
  rand
}
// })(window.lib3d || (window.lib3d = {}))
