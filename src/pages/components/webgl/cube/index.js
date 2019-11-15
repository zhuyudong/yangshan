import React, { useEffect } from 'react'
import createComponentExample from '@src/utils/createComponentExample'
import matrix from '@src/utils/webgl-matrix'
import math from '@src/utils/math'
import { Model } from '@src/utils/model'
import Euler from '@src/utils/euler'
import Vector3 from '@src/utils/vector3'
import Quaternion from '@src/utils/quaternion'
import {
  createCone,
  createFace,
  createWing,
  createCube,
  createSphere,
  createLongCube,
  getArrayTypeByAttribName,
  getElementsCountPerVertex,
  transformIndicesToUnIndices
} from '@src/utils/geometry'
import {
  getCanvas,
  getContext,
  randomColor,
  resizeCanvas,
  createSimpleProgram,
  createShaderFromScript,
  createSimpleProgramFromScript
} from '@src/utils/webgl-helper'

export default createComponentExample({
  id: 'webgl/cube',
  examples: ['basic'],
  dependencies: {
    useEffect,
    getCanvas,
    getContext,
    randomColor,
    resizeCanvas,
    createSimpleProgram,
    createShaderFromScript,
    createSimpleProgramFromScript,
    Model,
    matrix,
    lib3d: {
      math,
      Euler,
      Vector3,
      Quaternion
    },
    createCone,
    createFace,
    createWing,
    createCube,
    createSphere,
    createLongCube,
    getArrayTypeByAttribName,
    getElementsCountPerVertex,
    transformIndicesToUnIndices
  }
})
