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
              const items = [
                <li className='title' key={item.id}>
                  <h4 id={item.name}>{item.name}</h4>
                </li>
              ]
              if (item.children && item.children.length) {
                item.children.forEach(child => {
                  items.push(
                    <li key={child.id}>
                      <Link
                        to={`${localePath}${category}/${child.id}`}
                        className='header'
                      >
                        {child.name}
                        {locale === 'zh' && child.title !== child.name && (
                          <span>({child.title})</span>
                        )}
                      </Link>
                      <ul className='content'>
                        {child.components &&
                          child.components.map(name => (
                            <Item name={name} key={name} isComponent />
                          ))}
                        {child.apis &&
                          child.apis.map(name => (
                            <Item name={name} key={name} />
                          ))}
                      </ul>
                    </li>
                  )
                })
              }
            })}
          </ul>
        </div>
      </ComponentExample>
    )
  }
}
