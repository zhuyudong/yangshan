export default function getRoutes(context) {
  // {components: ['webgl', 'webgl/basic'], home: []}
  return context
    .keys()
    .filter(i => !i.includes('./routers.js'))
    .map(i =>
      i
        .match(/([\w-]+\/)+/)[0] // components/webgl/basic
        .slice(0, -1)
        .split('/')
    )
    .reduce((acc, cur) => {
      const [dir] = cur
      const path = cur.slice(1).join('/')
      !acc[dir]
        ? (acc[dir] = [path])
        : !acc[dir].includes(path)
          ? acc[dir].push(path)
          : null
      acc[dir] = acc[dir].filter(Boolean)
      return acc
    }, {})
}
