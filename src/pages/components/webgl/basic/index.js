import createComponent from '@src/utils/createComponent'
import {
  getCanvas,
  getContext,
  randomColor,
  resizeCanvas,
  createSimpleProgram,
  createShaderFromScript
} from '@src/utils/webgl/helper'

export default createComponent({
  id: 'webgl/basic',
  examples: ['point', 'line', 'triangle'],
  dependencies: {
    getCanvas,
    getContext,
    randomColor,
    resizeCanvas,
    createSimpleProgram,
    createShaderFromScript
  }
})
