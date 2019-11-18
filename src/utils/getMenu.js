import React from 'react'
import { get } from 'lodash/object'
import { Icon } from 'rsuite'
import { component, github } from '@src/components/SvgIcons'
import components from '@src/component.config.json'
import opensources from '@src/opensources.config.json'
import { getDict } from '@src/locales'

const dict = getDict()
const svgStyle = {
  width: 22
}

const getMenu = locale => {
  return [
    {
      id: 'opensources',
      name: get(locale, 'common.opensources'),
      icon: <Icon icon={github} svgStyle={svgStyle} size='lg' />,
      children: opensources
    },
    {
      id: 'components',
      name: get(locale, 'common.components'),
      icon: <Icon icon={component} svgStyle={svgStyle} size='lg' />,
      children: components
    }
  ]
}

export const menu = getMenu(dict)

export default getMenu
