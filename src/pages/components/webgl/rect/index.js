import React, { useEffect } from 'react'
import createComponentExample from '@src/utils/createComponentExample'
import {
  getCanvas,
  getContext,
  randomColor,
  resizeCanvas,
  createSimpleProgram,
  createShaderFromScript
} from '@src/utils/webgl-helper'

export default createComponentExample({
  id: 'webgl/rect',
  examples: ['basic'],
  dependencies: {
    useEffect,
    getCanvas,
    getContext,
    randomColor,
    resizeCanvas,
    createSimpleProgram,
    createShaderFromScript
  }
})
