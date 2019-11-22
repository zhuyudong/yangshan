import React from 'react'
import { Link } from 'react-router'
import { menu } from '@src/utils/getMenu'
import createComponent from '@src/utils/createComponent'

const category = 'components'
const components = (
  ((menu || []).find(i => i.id === category) || {}).children || []
).filter(item => item.id !== 'overview')

const Item = ({ name, isComponent }) => (
  <li>
    <span className="name">{isComponent ? `<${name}>` : name}</span>
  </li>
)

export default locale => {
  const ComponentExample = createComponent({
    category,
    id: 'overview'
  })(locale)
  const localePath = locale === 'zh' ? '/' : '/en/'
  return () => {
    return (
      <ComponentExample>
        <div className="component-overview">
          <ul>
            {components.map(item => {
              const items = [
                <li className="title" key={item.id}>
                  <h4 id={item.name}>{item.name}</h4>
                </li>
              ]
              if (item.children && item.children.length) {
                item.children.forEach(child => {
                  items.push(
                    <li key={child.id}>
                      <Link
                        to={`${localePath}${category}/${item.id}/${child.id}`}
                        className="header"
                      >
                        {child.name}
                        {locale === 'zh' &&
                          /[\u4e00-\u9fa5]+/.test(child.title) && (
                          <span>({child.title})</span>
                        )}
                      </Link>
                      <ul className="content">
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
              return items
            })}
          </ul>
        </div>
      </ComponentExample>
    )
  }
}
