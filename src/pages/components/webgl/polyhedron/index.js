import createComponent from '@src/utils/createComponent'
import math from '@src/utils/webgl/math'
import Euler from '@src/utils/webgl/euler'
import matrix from '@src/utils/webgl/matrix'
import { Model } from '@src/utils/webgl/model'
import Vector3 from '@src/utils/webgl/vector3'
import Quaternion from '@src/utils/webgl/quaternion'
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
} from '@src/utils/webgl/geometry'
import {
  getCanvas,
  getContext,
  randomColor,
  resizeCanvas,
  createSimpleProgram,
  createShaderFromScript,
  createSimpleProgramFromScript
} from '@src/utils/webgl/helper'

export default createComponent({
  id: 'webgl/polyhedron',
  examples: ['cube', 'rect', 'pyramis', 'platform', 'podetium'],
  dependencies: {
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
