import React from 'react'
import { get } from 'lodash/object'
import { Icon } from 'rsuite'
import {
  wrench,
  github,
  component,
  docs,
  practice
} from '@src/components/SvgIcons'
import components from '@src/component.config.json'
import { getDict } from '@src/locales'

const dict = getDict()
const svgStyle = {
  width: 22
}

const getMenu = locale => {
  return [
    {
      id: 'tools',
      name: get(locale, 'common.tools'),
      icon: <Icon icon={wrench} svgStyle={svgStyle} size="lg" />,
      children: null
    },
    {
      id: 'opensources',
      name: get(locale, 'common.opensources'),
      icon: <Icon icon={github} svgStyle={svgStyle} size="lg" />,
      children: null
    },
    {
      id: 'components',
      name: get(locale, 'common.components'),
      icon: <Icon icon={component} svgStyle={svgStyle} size="lg" />,
      children: components
    },
    {
      id: 'practice',
      name: get(locale, 'common.components'),
      icon: <Icon icon={practice} svgStyle={svgStyle} size="lg" />,
      children: null
    },
    {
      id: 'docs',
      name: get(locale, 'common.docs'),
      icon: <Icon icon={docs} svgStyle={svgStyle} size="lg" />,
      children: null
    }
  ]
}

export const menu = getMenu(dict)

export default getMenu
