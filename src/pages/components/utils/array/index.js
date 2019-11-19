import React, { useEffect } from 'react'
import Embed from 'react-runkit'
import createComponentExample from '@src/utils/createComponentExample'

export default createComponentExample({
  id: 'utils/array',
  examples: ['basic'],
  showSource: false,
  dependencies: {
    useEffect,
    Embed
  }
})
