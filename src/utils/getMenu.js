import React from 'react'
import { get } from 'lodash/object'
import { Icon } from 'rsuite'
import {
  docs,
  wrench,
  github,
  practice,
  component
} from '@src/components/SvgIcons'
import practices from '@src/practice.config.json'
import components from '@src/component.config.json'
import { getDict } from '@src/locales'

const dict = getDict()
const svgStyle = {
  width: 22
}

const filenames = require
  .context('../pages/docs', true, /\.md$/)
  .keys()
  .filter(i => i !== './index.md')
  .map((item, ix) => {
    const filename = item.slice(2)
    return {
      id: ix,
      name: filename,
      title: filename
    }
  })

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
      id: 'practices',
      name: get(locale, 'common.practice'),
      icon: <Icon icon={practice} svgStyle={svgStyle} size="lg" />,
      children: practices
    },
    {
      id: 'docs',
      name: get(locale, 'common.docs'),
      icon: <Icon icon={docs} svgStyle={svgStyle} size="lg" />,
      children: filenames
    },
    {
      id: 'docs/new',
      name: '新建文档',
      icon: <Icon icon={docs} svgStyle={svgStyle} size="lg" />,
      children: null
    }
  ]
}

export const menu = getMenu(dict)

export default getMenu
