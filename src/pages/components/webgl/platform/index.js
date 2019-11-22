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
  id: 'webgl/platform',
  examples: ['basic'],
  dependencies: {
    getCanvas,
    getContext,
    randomColor,
    resizeCanvas,
    createSimpleProgram,
    createShaderFromScript
  }
})
