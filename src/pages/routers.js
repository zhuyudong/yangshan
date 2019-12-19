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
      {Object.entries(routes).map(([dir, items = []]) =>
        items && items.length ? (
          <Route key={dir} path={dir} component={Frame}>
            <IndexRedirect
              to={
                items.includes('overview')
                  ? `${localePath}/${dir}/overview`
                  : `${localePath}/${dir}`
              }
            />
            {items.map(route => (
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
                  setTitle(
                    /^[A-Z]+/.test(route)
                      ? `${route} - ${dir}`
                      : `${capitalize(route)} - ${dir}`
                  )
                }}
              />
            ))}
          </Route>
        ) : (
          <Route
            key={dir}
            path={dir}
            getComponents={(location, callback) => {
              onEnter && onEnter()
              import(`./${dir}/index.js`).then(({ default: getComponent }) => {
                const component = getComponent(locale)
                callback && callback(null, component)
                onEntered && onEntered()
              })
            }}
            onEnter={() => {
              setTitle(capitalize(dir))
            }}
          />
        )
      )}
      <Route
        key="/docs/new"
        path="/docs/new"
        getComponents={(_, callback) => {
          onEnter && onEnter()
          import('./docs/new.js').then(({ default: getComponent }) => {
            const component = getComponent(locale)
            callback && callback(null, component)
            onEntered && onEntered()
          })
        }}
        onEnter={() => {
          setTitle('新建文档')
        }}
      />
      <Route
        path="*"
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
