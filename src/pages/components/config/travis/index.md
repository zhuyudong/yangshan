# Travis

`.travis.yml`

```
language: node_js

node_js:
  - 'node'

os:
  - windows
  - linux
  - osx

env:
  - BUILD_ENV=ci

branches:
  only:
    - master
    - test
    - /^greenkeeper\.*$/

install:
  - yarn

script:
  - yarn build
  - yarn test

after_success: yarn coverage
```