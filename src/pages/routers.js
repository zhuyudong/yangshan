import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { capitalize } from 'lodash/string'
import Frame from '@src/components/Frame'
import { setTitle } from '@src/title'
import components from '../component.config.json'

const routes = []
components.forEach(i => {
  if (i.children && i.children.length) {
    i.children.forEach(j => {
      routes.push(`${i.id}/${j.id}`)
    })
  } else {
    routes.push(i.id)
  }
})
export const createRouters = (locale, onEnter, onEntered) => {
  const localePath = locale === 'en' ? '/en/' : '/'

  return (
    <React.Fragment>
      <Route path='components' component={Frame}>
        <IndexRedirect to={`${localePath}/components/overview`} />
        {routes.map(route => (
          <Route
            key={route}
            path={route}
            getComponents={(location, callback) => {
              onEnter && onEnter()
              // require.ensure([], () => {
              //   const getComponent = require(`./components/${route}`).default
              //   const component = getComponent(locale)
              //   callback && callback(null, component)
              //   onEntered && onEntered()
              // })
              import(`./components/${route}/index.js`).then(
                ({ default: getComponent }) => {
                  const component = getComponent(locale)
                  callback && callback(null, component)
                  onEntered && onEntered()
                }
              )
            }}
            onEnter={() => {
              setTitle(`${capitalize(route)} - components`)
            }}
          />
        ))}
      </Route>
      {/* <Route path='tools' component={Frame}>
        <IndexRedirect to={`${localePath}/tools/palette`} />

        <Route
          path='palette'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./tools/palette')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Palette - tools')
          }}
        />

        <Route
          path='icons'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./tools/icons')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Icons - tools')
          }}
        />
      </Route>

      <Route path='guide' component={Frame}>
        <Route
          path='introduction'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/introduction')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Introduction - guide')
          }}
        />

        <Route
          path='usage'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/usage')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Usage - guide')
          }}
        />

        <Route
          path='use-with-create-react-app'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/use-with-create-react-app')[
                'default'
              ]
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Use in create-react-app - guide')
          }}
        />

        <Route
          path='use-next-app'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/use-next-app')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Use in Next.js - guide')
          }}
        />

        <Route
          path='modularized'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/modularized')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Modularized - guide')
          }}
        />

        <Route
          path='themes'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/themes')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Customize theme - guide')
          }}
        />

        <Route
          path='intl'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/intl')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Internationalization - guide')
          }}
        />

        <Route
          path='rtl'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/rtl')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Right-to-left - guide')
          }}
        />

        <Route
          path='html-elements'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/html-elements')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Supported HTML Elements - guide')
          }}
        />

        <Route
          path='v3-to-v4'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            require.ensure([], require => {
              const getComponent = require('./guide/v3-to-v4')['default']
              const component = getComponent(locale)
              callback && callback(null, component)
              onEntered && onEntered()
            })
          }}
          onEnter={() => {
            setTitle('Supported HTML Elements - guide')
          }}
        />
      </Route>

      <Route
        path='extensions'
        getComponents={(location, callback) => {
          onEnter && onEnter()
          require.ensure([], require => {
            const getComponent = require('./extensions')['default']
            const component = getComponent(locale)
            callback && callback(null, component)
            onEntered && onEntered()
          })
        }}
        onEnter={() => {
          setTitle('Extensions')
        }}
      />

      <Route
        path='*'
        getComponents={(location, callback) => {
          onEnter && onEnter()
          require.ensure([], require => {
            const getComponent = require('./error/index')['default']
            const component = getComponent(locale)
            callback && callback(null, component)
            onEntered && onEntered()
          })
        }}
      /> */}
    </React.Fragment>
  )
}
