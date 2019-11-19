import React, { Fragment } from 'react'
import { Route, IndexRedirect } from 'react-router'
import { capitalize } from 'lodash/string'
import Frame from '@src/components/Frame'
import { setTitle } from '@src/title'
import getRoutes from '@src/utils/dir'

// {components: ['webgl', 'webgl/basic'], home: []}
const routes = getRoutes(require.context('./', true, /\.js/))
export const createRouters = (locale, onEnter, onEntered) => {
  const localePath = locale === 'en' ? '/en/' : '/'
  return (
    <Fragment>
      {Object.entries(routes).map(([dir, items = []]) => (
        <Route key={dir} path={dir} component={Frame}>
          <IndexRedirect
            to={
              items.length
                ? `${localePath}/${dir}/overview`
                : `${localePath}/${dir}`
            }
          />
          {!!items.length &&
            items.map(route => (
              <Route
                key={`${dir}/${route}`}
                path={route}
                getComponents={(location, callback) => {
                  onEnter && onEnter()
                  // require.ensure([], () => {
                  //   const getComponent = require(`./components/${route}`).default
                  //   const component = getComponent(locale)
                  //   callback && callback(null, component)
                  //   onEntered && onEntered()
                  // })
                  import(`./${dir}/${route}/index.js`).then(
                    ({ default: getComponent }) => {
                      const component = getComponent(locale)
                      callback && callback(null, component)
                      onEntered && onEntered()
                    }
                  )
                }}
                onEnter={() => {
                  setTitle(`${capitalize(route)} - ${dir}`)
                }}
              />
            ))}
        </Route>
      ))}
      {/* <Route path='components' component={Frame}>
        <IndexRedirect to={`${localePath}/components/overview`} />
        {routes.components.map(route => (
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
      </Route> */}
      {/* <Route path='opensource' component={Frame}>
        <IndexRedirect to={`${localePath}/opensource/overview`} />
        <Route
          path='overview'
          getComponents={(location, callback) => {
            onEnter && onEnter()
            import('./opensource/overview/index.js').then(
              ({ default: getComponent }) => {
                const component = getComponent(locale)
                callback && callback(null, component)
                onEntered && onEntered()
              }
            )
          }}
          onEnter={() => {
            setTitle('Overview - OpenSource')
          }}
        />
        <Route
          path='react'
          getComponents={(location, callback) => {
            import('./opensource/react/index.js').then(
              ({ default: getComponent }) => {
                const component = getComponent(locale)
                callback && callback(null, component)
                onEntered && onEntered()
              }
            )
          }}
          onEnter={() => {
            setTitle('React - OpenSource')
          }}
        />
      </Route> */}

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
      />
    </Fragment>
  )
}
