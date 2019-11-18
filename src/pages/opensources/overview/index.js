import React from 'react'
import { Link } from 'react-router'
import { menu } from '@src/utils/getMenu'
import createComponentExample from '@src/utils/createComponentExample'

const category = 'opensources'
const components = (
  ((menu || []).find(i => i.id === category) || {}).children || []
).filter(item => item.id !== 'overview')
const Item = ({ name, isComponent }) => (
  <li>
    <span className='name'>{isComponent ? `<${name}>` : name}</span>
  </li>
)

export default locale => {
  const ComponentExample = createComponentExample({
    category,
    id: 'overview'
  })(locale)
  const localePath = locale === 'zh' ? '/' : '/en/'
  return () => {
    return (
      <ComponentExample>
        <div className='component-overview'>
          <ul>
            {components.map(item => {
              if (item.children && item.children.length) {
                return (
                  <li className='title' key={item.id}>
                    <h4 id={item.name}># {item.name}</h4>
                  </li>
                )
              } else {
                return (
                  <li key={item.id}>
                    <Link
                      to={`${localePath}${category}/${item.id}`}
                      className='header'
                    >
                      {item.name}
                      {locale === 'zh' && <span>({item.title})</span>}
                    </Link>
                    <ul className='content'>
                      {item.components &&
                        item.components.map(name => (
                          <Item name={name} key={name} isComponent />
                        ))}
                      {item.apis &&
                        item.apis.map(name => <Item name={name} key={name} />)}
                    </ul>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </ComponentExample>
    )
  }
}
